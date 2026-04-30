import ExpertForm from "../components/ExpertForm";
import ExpertList from "../components/ExpertList";

const Home = () => {
  return (
    <>
      <div className="card">
        <h2>Add Expert</h2>
        <ExpertForm />
      </div>

      <div className="card">
        <h2>Experts</h2>
        <ExpertList />
      </div>
    </>
  );
};

export default Home;