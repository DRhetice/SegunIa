import React, { useEffect, useRef, useState } from "react";
import "./chat.css";

export default function Chat() {
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const autoResponses = {
    bonjour: "Bonjour! Comment puis-je vous aider?",
    "au revoir": "Au revoir! Bonne journée!",
    "parle moi de ceci": [
      "Située dans la merveilleuse cité de Ouidah, la porte du non-retour est l’un des lieux touristiques d’envergure mondiale que compte le Bénin. Bâtie à l’initiative de l’UNESCO, elle est le porte-étendard principal de l’histoire coloniale du Dahomey. Construite sous la forme d’un arc, la Porte du non-retour symbolise la déportation des esclaves. C’est donc à dessein qu’elle a été érigée sur la plage de Ouidah en face de la mer. Elle est recouverte de plusieurs fresques et signes qui témoignent des atrocités que subissaient jadis les esclaves.",
      "La porte du non-retour marque également l’ultime étape de la route des esclaves. Un parcours qui a démarré par la sélection des esclaves et le détour vers l’arbre de l’oubli. Découvrir la Porte du non-retour, c’est marcher dans les pas des esclaves et vivre une expérience unique, un voyage inouï et empreint d’émotions. À proximité de cette attraction sont installés d’autres lieux touristiques du Bénin que vous pouvez explorer dans la ville des souvenirs. Les incontournables d’entre eux sont : L’arbre de l’oubli ;Le temple de pythons ;Le musée d’histoire de Ouidah ;La forêt sacrée de Kpassè…",
      "En langue Fon:",
      "Tɔn wa gbɛ gbagba xɔ dɔ wa na Ouidah, Nu Yi Non-vɛ aʋi ɖɔ-ɖo nu a nyiɖɛ ɖi nu kpoviɛ nu wa na Bénin. UNESCO tɔn mɛxɔ nu nyi ɖo gbɛ dɔ ɔ ɖa nu nɔnkpɔ xɔ mɛ Dahomey. Nu wa ɖɔ-ɖo na nu nɔ nu a, Nu Yi Non-vɛ aʋi ɖɔ wɛn nu sɔ nu gbɔ ɔ ɖa nu wa xɔ mɛ tɔn sɔ na sɔ da ɛ nɔn ɔ gbɔ ɔ tɔn. Tɔn nu da gbɛ na nu kpan ɖi mɛ tɔn nu sɔ na gbɛ mɛ yɔ nu kɔcɛ kɔ nu wa xɔ ɛ mɛ. Nu Yi Non-vɛ aʋi ɖɔ da ɛɖɔ nu kɛxɛ nu nu a yi Nu Yi Dɔnyɔmɛ. Nu ɖa wɛ nu sɔ ɛ yi yi ɛ wa xɔ mɛ nu a gbɛ mɛ wa dɔn nu wa nu kpɔxɛxɛ nu wa a yi xɛ Nu Ɖɛ nu do Nu Yi Nuxɔ nu a gbɛ nu do wa yi na. Nu yi ɖo Nu Yi Non-vɛ aʋi ɖɔ, yi nu yi nu yi kpo sɛ gbɛ sɔ tɔn wa xɔ ɔ yi a xɛ ɛ mɛ, ɛ nu ɛ yi xɛ wa a yɔ, sɛ wɛnɛ sɛ ɛ ɖaɛ yi gbɔ nu. Aɛgbɛ sɛ nu wa ɛ yɛ na yi wa gbɛ xɔ nu yi sɛ nu kpoviɛ wa na Bénin ɛ yi gbɔ nu yi Nu Yi Nu a yi Nu Yi hɛn nu a. A yi gbɛ gbɔ ɛ: Nu Ɖɛ Nu Ɖo Nu Yi Nu Yi Dɔnyɔmɛ ;Le Temple de pythons ;Le Musée d’histoire de Ouidah ;La Forêt sacrée de Kpassè…"
    ]
  };

  const getAutoResponse = (message) => {
    const response = autoResponses[message.toLowerCase()];
    return response || "Je ne comprends pas votre message.";
  };

  const getAutoImageResponse = (fileName) => {
    const response = autoImageResponses[fileName];
    return response || "url_to_default_response_image.jpg";
  };

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImg = {
        file: file,
        url: URL.createObjectURL(file),
        type: "image",
        name: file.name,
      };
      setImg(newImg);
      setShowTextarea(true);
    }
  };

  const handleSend = async () => {
    let tempChat = [...chat];

    if (img.file && text.trim() === "") {
      const imageResponse = getAutoImageResponse(img.file.name);
      tempChat.push({ type: "image", url: img.url, sender: "user" });
      tempChat.push({ type: "image", url: imageResponse, sender: "bot" });
    } else if (img.file && text.trim() !== "") {
      const textResponse = getAutoResponse(text);
      tempChat.push({ type: "image", url: img.url, sender: "user" });
      tempChat.push({ type: "text", content: text, sender: "user" });
      tempChat.push({ type: "text", content: textResponse, sender: "bot" });
    } else if (text.trim() !== "") {
      const textResponse = getAutoResponse(text);
      tempChat.push({ type: "text", content: text, sender: "user" });
      tempChat.push({ type: "text", content: textResponse, sender: "bot" });
    }

    setChat(tempChat);
    setImg({
      file: null,
      url: "",
    });
    setText("");
    setShowTextarea(false);
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={"./Segunl.png"} alt="User Avatar" />
          <div className="texts">
            <span>Segun</span>
            <p>Guide Touristique Virtuel.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./info.png" alt="Info" />
        </div>
      </div>
      <div className="center">
        {chat.map((item, index) => (
          <div
            key={index}
            className={`message ${item.sender === "user" ? "own" : "bot"}`}
          >
            {item.type === "image" && <img src={item.url} alt="Image" />}
            {item.type === "text" && (
              <div className="texts">
                {Array.isArray(item.content) ? (
                  item.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <p>{item.content}</p>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="Upload" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src="./camera.png" alt="Camera" />
          <img src="./mic.png" alt="Mic" />
        </div>

        {img.url && (
          <div className="image-preview">
            <img src={img.url} alt="Preview" />
            {showTextarea && (
              <>
                <input
                  type="text"
                  placeholder="Tapez un message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button className="sendButton" onClick={handleSend}>
                  Envoyer
                </button>
              </>
            )}
          </div>
        )}

        {!showTextarea && (
          <>
            <input
              type="text"
              placeholder="Tapez un message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="sendButton" onClick={handleSend}>
              Envoyer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
