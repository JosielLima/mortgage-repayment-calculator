import illustrationEmpty from '../assets/illustration-empty.svg';
const Result = () => {
  return <div className="result">
    <img src={illustrationEmpty} alt="No calculations performed" className="result-image" />
    <h6 className="text-preset-2 text-center text-white">Results shown here</h6>
    <p className="text-preset-4 text-center">Complete the form and click “calculate repayments” to see what 
    your monthly repayments would be.</p>
  </div>;
};

export default Result;