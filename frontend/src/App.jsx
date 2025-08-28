import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to ProShop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};
