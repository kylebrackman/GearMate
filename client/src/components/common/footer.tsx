import { Typography, Link, Box, Divider } from "@mui/material";

function Copyright() {
    return (
        <Typography>
            {"Copyright "}
            <Link color="inherit" href="https://material-ui.com/">
                GearMate
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const Footer = () => {
    return (
        <Box
            sx={{
                position: "sticky",
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                backgroundColor: "white",
            }}
        >
            <Box sx={{ flex: 1 }}>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 500 }}>
                    GearMate
                </Typography>
            </Box>
            <Copyright />
        </Box>
    );
};

export default Footer;
