import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class PayPalButton extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            isSdkReady: false,
        };
    }

    componentDidMount() {
        if (
            typeof window !== "undefined" &&
            window !== undefined &&
            window.paypal === undefined
        ) {
            this.addPaypalSdk();
        }
        else if (
            typeof window !== "undefined" &&
            window !== undefined &&
            window.paypal !== undefined &&
            this.props.onButtonReady
        ) {
            this.props.onButtonReady();
        }
    }

    //This function sets up the details of the transaction,
    //incuding the amount and line item details.
    createOrder(data, actions) {

        const { currency, amount, shippingPreference } = this.props;

        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: currency,
                value: amount.toString()
              }
            }
          ],
          application_context: {
            shipping_preference: shippingPreference
          }
        });
    }

    onApprove(data, actions) {

        const { userId, newTier } = this.props;

        return actions.order
            .capture()
            .then((details) => {
                if (this.props.onSuccess) {
                    axios.get('/api/userPortal')
                    .then(res => {
                        console.log(res);
                        res.data.find((info) => {
                            if (info.userId === userId) {
                                let id = info._id;  //Will need to update this when we get the listing selector sorted out
                                info.listings[0].subscriptionTier = newTier;
                                console.log(info.listings);
                                console.log(newTier);

                                axios.put('/api/userPortal/' + id, {
                                    "userId": info.userId,
                                    "name": "Mike Test",
                                    "phone": info.phone,
                                    "emailAddress": info.emailAddress,
                                    "address": info.address,
                                    "service": info.service,
                                    "accessibility": info.accessibility,
                                    "listings": info.listings
                                })
                            }
                        })
                    });

                    return this.props.onSuccess(details, data);
                }
            })
            .catch((err) => {
                if (this.props.catchError) {
                    return this.props.catchError(err);
                }
            });
    }

    render() {
        const {
            amount,
            onSuccess,
            createOrder,
            onApprove,
            style,
        } = this.props;
        const { isSdkReady } = this.state;

        if (
            !isSdkReady &&
            (typeof window === "undefined" || window.paypal === undefined)
        ) {
            return null;
        }

        const Button = window.paypal.Buttons.driver("react", {
            React,
            ReactDOM,
        });

        return (
            <Button
                {...this.props}
                createOrder={
                    amount && !createOrder
                        ? (data, actions) => this.createOrder(data, actions)
                        : (data, actions) => createOrder(data, actions)
                }
                onApprove={
                    onSuccess
                        ? (data, actions) => this.onApprove(data, actions)
                        : (data, actions) => onApprove(data, actions)
                }
                style={style}
            />
        );
    }

    addPaypalSdk() {
        const { clientId, currency, onButtonReady } = this.props;
        const queryParams = [];

        const options = {
            clientId,
            currency
        };

        Object.keys(options).forEach(k => {
            const name = k.split(/(?=[A-Z])/).join("-").toLowerCase();
            queryParams.push(`${name}=${options[k]}`);
        });

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?${queryParams.join("&")}`;
        script.async = true;
        script.onload = () => {
            this.setState({ isSdkReady: true });

            if (onButtonReady) {
                onButtonReady();
            }
        };
        script.onerror = () => {
            throw new Error("Paypal SDK could not be loaded.");
        };
    
        document.body.appendChild(script);
    }
}

export default PayPalButton;

