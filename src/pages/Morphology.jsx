function Morphology() {
  return (
    <main className="container px-4 py-4">
      <article>
        <section>
          <h3 className="h3 text-success">Зовнішній вигляд</h3>
          <p>Пантера — великий ссавець ряду хижих родини котових. Велика кішка з витягнутим і дещо стислим з боків м'язистим тілом, округлою головою, довгим хвостом і середньої довжини кінцівками.</p>
        </section>
        <section>
          <h3 className="h3 text-success">Особливості будови</h3>
          <ul>
            <li>Довжина тіла досягає 200—250 см (з яких 75-110 см припадають на хвіст).</li>
            <li>Маса самиць — 35-50 кг, самці — 45-70 кг.</li>
            <li>Зубів, як і у гепарда, 30.</li>
          </ul>
        </section>
        <figure className="text-center">
          <img src="../images/leopardess-inquisitive-stare-19112013jpeg.webp" alt="Пантера на гілці" className="img-fluid rounded my-4"/>
          <figcaption className="text-muted">Молода пантера</figcaption>
        </figure>
      </article>
    </main>
  );
}

export default Morphology;