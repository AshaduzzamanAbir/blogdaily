import Bloglist from "@/components/Bloglist";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ToastContainer from "@/components/ToastContainer";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Bloglist />
      <Footer />
    </>
  );
}
