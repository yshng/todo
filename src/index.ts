import "./styles/button.css";
import "./styles/card.css";
import "./styles/delete-message.css";
import "./styles/edit-card.css";
import "./styles/layout.css";
import "./styles/projects.css";
import "./styles/overview.css";
import "./ui/new-item-button";
import "./ui/overview";
import { checkStorage } from "./model/storage";
import { updateDisplay } from "./ui/update-display";

checkStorage();
updateDisplay();