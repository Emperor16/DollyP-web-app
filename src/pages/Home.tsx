import PageContainer from "../components/layout/PageContainer";

const Home = () => {
  return (
    <PageContainer>
      <h1 className="font-serif text-4xl text-dp-black mb-6">
        Discover Luxury Fashion
      </h1>

      <p className="font-sans text-dp-charcoal/80 leading-relaxed max-w-xl">
        Explore our curated collection of premium dresses crafted with elegance and precision.
      </p>
    </PageContainer>
  );
};

export default Home;
