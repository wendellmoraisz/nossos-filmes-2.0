import { Container, CssBaseline, Box, Avatar, Typography, FormControl, TextField, Button, Grid } from "@mui/material";
import Logo from "../assets/nossos-filmes-logo.png";
import useAuth from "../hooks/useAuth";
import AuthUser from "../@types/AuthUser";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

    const {
        control,
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const loginUser = async (user: AuthUser) => {
        try {
            await login(user);
            navigate("/home");
        } catch (error) {
            toast.error("Login inválido", {
                id: "login-error"
            });
        }
    }

    return (
        <Container component="main" sx={{ width: "100vw", display: "flex", justifyContent: "center" }}>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: 8,
                    maxWidth: 400,
                    alignItems: "center"
                }}
            >
                <Avatar src={Logo} sx={{ width: 250, height: 200 }} />
                <Typography component="h1" variant="h5">
                    Entrar
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <form onSubmit={handleSubmit(data => {
                        loginUser(data as AuthUser)
                    })}>
                        <FormControl fullWidth>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: "Campo obrigatório" }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <Controller
                                name={"password"}
                                control={control}
                                defaultValue=""
                                rules={{ required: "Campo obrigatório" }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        name={"password"}
                                        label={"Senha"}
                                        type={"password"}
                                        id={"password"}
                                        autoComplete={"current-password"}
                                    />
                                )}
                            />
                        </FormControl>
                        <Button
                            type={"submit"}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Entrar
                        </Button>
                    </form>
                    <Grid container>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;