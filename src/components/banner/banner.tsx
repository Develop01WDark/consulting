export default function Banner() {
  return (
    <div className="banner">
      <div className="banner--img">
        <img
          src="https://506consulting.com/sites/default/files/gva-sliderlayer-upload/slider-1.jpg"
          alt="banner"
          width="400"
        />
      </div>
      <div className="banner--info">
        <div className="banner--info--subtitle">
            <h4>Sé dísruptivo</h4>
        </div>
        <div className="banner--info--title">
            <h1>Hagamos que las cosas funcionen</h1>
        </div>
        <div className="banner--info--description">
            <p>Somos firma disruptiva con operaciones en Estado Unidos y Costa Rica para entrega de valor el mundo.</p>
        </div>
      </div>
    </div>
  );
}
