import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 200px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  background-image:url(https://img.freepik.com/premium-photo/black-brick-building-wall_73152-4222.jpg);
  background-position: cover;
  color: white;
  border: 5px solid #af5d1a;
  box-shadow:inset 0 0 10px 1px #af5d1a;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.5rem;
    gap: 10px;
    
    a {
        text-decoration: none;
        color: white;
    }
    a:hover{
        
        color: #af5d1a;
    }
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 20px;
    h1 {
      margin-top: 0;
      font-size: 3rem;
    }
    p {
      margin-bottom: 0;
      font-size: 1.5rem;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <ul>
        <li>
          <a href="">Contacts</a>
        </li>
        <li>
          <a href="">Legal</a>
        </li>
        <li>
          <a href="">Privacy Policy</a>
        </li>
        <li>
          <a href="">Terms of Service</a>
        </li>
        <li>
          <a href=""></a>
        </li>
      </ul>
      <div className="trademark">
        <h1>Aidas Dovydenas&reg;</h1>
        <p>2023-12</p>
      </div>
    </StyledFooter>
  );
};

export default Footer;
