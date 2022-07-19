import React from 'react';
import {
Nav,
NavLink,
NavMenu,
} from './NavbarElements';
import { AiFillHome,AiFillFileImage } from "react-icons/ai";
import { FaFileVideo } from "react-icons/fa";


const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
		<NavLink to='/' activeStyle>
			<AiFillHome/> Accueil
		</NavLink>
		<NavLink to='/Image' activeStyle>
			<AiFillFileImage/> Tester avec Image
		</NavLink>
		<NavLink to='/Video' activeStyle>
			<FaFileVideo/> Tester avec Video
		</NavLink>
		</NavMenu>
		<img src="https://techblog.ingeniance.fr/wp-content/uploads/2019/07/cropped-Logo_Horizontal_couleur_CMJN-1.png" style={{height:"50px",margin:"3px"}}></img>
	</Nav>
	</>
);
};


export default Navbar;
