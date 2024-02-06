import { Typography, Button, Avatar } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Container, LinksContainer, StyledLink } from "./HomeStyled";
import Logo from "../../assets/nossos-filmes-logo.png";

const Home = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const logoutApp = () => {
        logout();
        navigate("/login");
    }

    return (
        <Container>
            <LinksContainer >
                <Avatar src={Logo} sx={{ width: 250, height: 150 }} />
                <Typography color={"#fff"} textAlign={"center"} variant="h4" component="h1">
                    {`Olá, ${user?.name}!`}
                </Typography>
                <StyledLink to={"/filmes-para-mim"}>Filmes para mim</StyledLink>
                <StyledLink to={"/minha-lista"}>Minha lista</StyledLink>
                <StyledLink to={"/nossos-filmes"}>Nossos filmes</StyledLink>
                <StyledLink to={"/indicacoes"}>{`Filmes para ${user?.pair.name}`}</StyledLink>
                <StyledLink to={"/filmes-de"}>{`Filmes de ${user?.pair.name}`}</StyledLink>
                <Button onClick={() => { logoutApp() }}>
                    <DirectionsRunIcon /> Sair
                </Button>
            </LinksContainer>
        </Container>
    )
}

export default Home;