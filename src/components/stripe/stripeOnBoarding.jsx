import { stripeOnBoradingApi } from "../../api/backEnd/buyProcess/stripe.backend";

export const StripeOnboarding = ({id}) => {
    const handleCreateAccount = async () => {
      const response = await stripeOnBoradingApi(id)
      response.json().then((data)=>{
          window.location.href = data.url;
      })
    };
  
    return (
      <button onClick={handleCreateAccount}>créer son compte Stripe</button>
    );
  };
  
  export default StripeOnboarding;