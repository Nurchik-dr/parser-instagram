import app from "./app";
import "dotenv/config";
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
