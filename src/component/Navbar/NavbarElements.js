import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
background: transparent;
display: flex;
justify-content: space-between;
z-index: 12;
background-color: #f3804b;
box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2), 0 5px 10px 0 rgba(0,0,0,0.19);
border-radius: 10px;
`;

export const NavLink = styled(Link)`
color: #808080;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 2rem;
cursor: pointer;
&.active {
	color: #000000;
}
&.hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

`;


export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-bottom: 2px;
@media screen and (max-width: 768px) {
	display: none;
}
`;


