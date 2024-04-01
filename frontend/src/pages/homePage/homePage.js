// Component Imports 
import NavBar from "../../components/navBar/navBar"
import BasicSearchForm from "../../components/basicSearchForm/basicSearchForm"
import FeaturedAdverts from "../../components/featuredAdverts/featuredAdverts"
import SellYourCar from "../../components/sellYourCar"
import Footer from "../../components/footer/footer"
// Styling imports
import "./homePage.css"
const HomePage = () =>{
    return(
        <div className="homePage">
            <NavBar></NavBar>
            <BasicSearchForm></BasicSearchForm>
            <FeaturedAdverts></FeaturedAdverts>
            <SellYourCar></SellYourCar>
            <Footer></Footer>
        </div>
        
    )
}
export default HomePage