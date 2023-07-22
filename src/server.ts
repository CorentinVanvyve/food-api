import app from "./app";
import { PORT } from "./constants/foodApiConstants";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));