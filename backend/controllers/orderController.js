import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:5174';

    try {
        // Create a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Map items from request body to Stripe line items
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                    description: item.description || "No description provided", // Optional description
                },
                unit_amount: item.price * 100 * 80, // Multiply by 100 to convert to smallest currency unit
            },
            quantity: item.quantity,
        }));

        // Add delivery charges as a separate line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery charges",
                    description: "Flat delivery charges",
                },
                unit_amount: 2 * 100 * 80,
            },
            quantity: 1,
        });

        // Create a Stripe session for the checkout
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Send session URL to the frontend
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

const verifyOrder = async (req, res) => {

    const {orderId, success} = req.body;

    try {
        
        if(success == "true"){

            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({ success: true, message:"Paid"});

        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Not Paid"});
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"}); 
    }

}

const userOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders});

    } catch (error) {
        console.log(error);
        res.json({success:false, message: Error});
    }
}

// Listing order for admin panel
const listOrders = async (req, res) => {

    try {
        
        const orders = await orderModel.find({});
        res.json({success: true, data: orders});

    } catch (error) {
        
        console.log(error);
        res.json({success: false, message: "Error"});
    }

}

const updateStatus = async (req, res) => {
    
    try {
        
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Status updated"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Error'})
    }

}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
