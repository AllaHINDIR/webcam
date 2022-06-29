import './accueil.css';

const Accueil = () => {
  return (
    <div>
      <div className="accueil">
        <div className="glow">Bienvenue chez <div>"Face-App"</div></div>
      </div>
      <div className="fonctionnalite">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/camera-icon-design-template-2bd783359419c065960e576e548ec365_screen.jpg?ts=1625418756" alt="Avatar" style={{ width: "300px", height: "300px" }}></img>
              </div>
              <div class="flip-card-back">
                <h1>Prenez une photo !</h1>
                <p>Pour savoir la célébrité qui vous ressemble le plus.</p>
              </div>
            </div>
          </div>
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/video-camera-icon-design-template-bf79973542745b22d532a473c81a7a57_screen.jpg?ts=1625750953" alt="Avatar" style={{ width: "300px", height: "300px" }}></img>
              </div>
              <div class="flip-card-back">
                <h1>Filmez une vidéo !</h1>
                <p>En changeant votre visage par celui de la célébrité qui vous ressemble le plus.</p>
              </div>
            </div>
          </div>
        </div>
    </div>


  );
}

export default Accueil;