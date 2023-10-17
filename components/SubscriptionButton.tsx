"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";

type Props = { isPro: boolean };

const SubscriptionButton = (props: Props) => {
	const [loading, setLoading] = React.useState(false);
	return (
		<Button disabled={loading} variant="outline">
			{props.isPro ? "Manage Subscriptions" : "Get Pro"}
		</Button>
	);
};

export default SubscriptionButton;
