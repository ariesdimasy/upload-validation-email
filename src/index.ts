import App from "./app"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const main = () => {
    const app = new App()
    app.start()
}

main()