import { stripeOnBoradingApi } from "../../api/backEnd/buyProcess/stripe.backend";

export const StripeOnboarding = ({id}) => {
    const handleCreateAccount = async () => {
      const response = await stripeOnBoradingApi(id)
      response.json().then((data)=>{
          window.location.href = data.url;
      })
    };
  
    return (
      <button onClick={handleCreateAccount}>S&apos;inscrire avec Stripe</button>
    );
  };
  
  export default StripeOnboarding;