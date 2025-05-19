import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Population() {
  return (
    <main className="container px-4 py-4">
      <div className="row">
        <aside className="col-md-3">
          <nav className="sticky-top pt-3" aria-label="Зміст сторінки">
            <h2 className="h4">Зміст</h2>
            <ul className="nav flex-column">
              <a href="#continentsList" className="nav-link" data-bs-toggle="collapse">Континенти</a>
              <a href="#subcontinentsList" className="nav-link" data-bs-toggle="collapse">Субконтиненти</a>
              <a href="#countriesList" className="nav-link" data-bs-toggle="collapse">Країни</a>
              <a href="#biogeographicList" className="nav-link" data-bs-toggle="collapse">Біогеографічні зони</a>
              <a href="#biomesList" className="nav-link" data-bs-toggle="collapse">WWF Біоми</a>
            </ul>
          </nav>
        </aside>

        <article className="col-md-9">
          <h2 className="h2 text-success mb-4">Ареал поширення пантер</h2>
          
          <section id="continents" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#continentsList" 
                      aria-expanded="false" 
                      aria-controls="continentsList">
                Континенти
              </button>
            </h3>
            <div className="collapse" id="continentsList">
              <ul className="list-group mb-3">
                <li class="list-group-item">Африка</li>
                <li class="list-group-item">Азія</li>
              </ul>
            </div>
          </section>

          <section id="subcontinents" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#subcontinentsList" 
                      aria-expanded="false" 
                      aria-controls="subcontinentsList">
                Субконтиненти
              </button>
            </h3>
            <div className="collapse" id="subcontinentsList">
              <ul className="list-group mb-3">
                <li class="list-group-item">Південна Азія</li>
                <li class="list-group-item">Субсахарська Африка</li>
                <li class="list-group-item">Західна Азія</li>
                <li class="list-group-item">Південно-Східна Азія</li>
                <li class="list-group-item">Східна Азія</li>
                <li class="list-group-item">Північна Африка</li>
                <li class="list-group-item">Центральна Азія</li>
              </ul>
            </div>
          </section>

          <section id="countries" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#countriesList" 
                      aria-expanded="false" 
                      aria-controls="countriesList">
                Країни
              </button>
            </h3>
            <div className="collapse" id="countriesList">
              <ul className="list-group mb-3 list-columns">
                <li class="list-group-item">Ангола</li>
                <li class="list-group-item">Вірменія</li>
                <li class="list-group-item">Азербайджан</li>
                <li class="list-group-item">Бангладеш</li>
                <li class="list-group-item">Бенін</li>
                <li class="list-group-item">Бутан</li>
                <li class="list-group-item">Ботсвана</li>
                <li class="list-group-item">Буркіна-Фасо</li>
                <li class="list-group-item">Бурунді</li>
                <li class="list-group-item">Камбоджа</li>
                <li class="list-group-item">Камерун</li>
                <li class="list-group-item">Центральноафриканська Республіка</li>
                <li class="list-group-item">Чад</li>
                <li class="list-group-item">Китайська Народна Республіка</li>
                <li class="list-group-item">Республіка Конго</li>
                <li class="list-group-item">Демократична Республіка Конго</li>
                <li class="list-group-item">Кот-д'Івуар</li>
                <li class="list-group-item">Джибуті</li>
                <li class="list-group-item">Єгипет</li>
                <li class="list-group-item">Екваторіальна Гвінея</li>
                <li class="list-group-item">Еритрея</li>
                <li class="list-group-item">Ефіопія</li>
                <li class="list-group-item">Габон</li>
                <li class="list-group-item">Гана</li>
                <li class="list-group-item">Гвінея</li>
                <li class="list-group-item">Гвінея-Бісау</li>
                <li class="list-group-item">Індія</li>
                <li class="list-group-item">Індонезія</li>
                <li class="list-group-item">Іран</li>
                <li class="list-group-item">Ірак</li>
                <li class="list-group-item">Кенія</li>
                <li class="list-group-item">Ліберія</li>
                <li class="list-group-item">Малаві</li>
                <li class="list-group-item">Малайзія</li>
                <li class="list-group-item">Малі</li>
                <li class="list-group-item">Мозамбік</li>
                <li class="list-group-item">М'янма</li>
                <li class="list-group-item">Намібія</li>
                <li class="list-group-item">Непал</li>
                <li class="list-group-item">Нігер</li>
                <li class="list-group-item">Нігерія</li>
                <li class="list-group-item">Оман</li>
                <li class="list-group-item">Пакистан</li>
                <li class="list-group-item">Росія</li>
                <li class="list-group-item">Руанда</li>
                <li class="list-group-item">Саудівська Аравія</li>
                <li class="list-group-item">Сенегал</li>
                <li class="list-group-item">Сьєрра-Леоне</li>
                <li class="list-group-item">Сомалі</li>
                <li class="list-group-item">Південно-Африканська Республіка</li>
                <li class="list-group-item">Південний Судан</li>
                <li class="list-group-item">Шрі-Ланка</li>
                <li class="list-group-item">Судан</li>
                <li class="list-group-item">Есватіні</li>
                <li class="list-group-item">Танзанія</li>
                <li class="list-group-item">Таїланд</li>
                <li class="list-group-item">Туреччина</li>
                <li class="list-group-item">Туркменістан</li>
                <li class="list-group-item">Уганда</li>
                <li class="list-group-item">Ємен</li>
                <li class="list-group-item">Замбія</li>
                <li class="list-group-item">Зімбабве</li>
                <li class="list-group-item">Афганістан</li>
              </ul>
            </div>
          </section>

          <section id="biogeographic" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#biogeographicList" 
                      aria-expanded="false" 
                      aria-controls="biogeographicList">
                Біогеографічні зони
              </button>
            </h3>
            <div className="collapse" id="biogeographicList">
              <ul className="list-group mb-3">
                <li class="list-group-item">Палеарктика</li>
                <li class="list-group-item">Індомалайя</li>
                <li class="list-group-item">Афротропіка</li>
              </ul>
            </div>
          </section>

          <section id="biomes" className="mt-4">
            <h3>
              <button className="btn btn-success w-100 text-start" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#biomesList" 
                      aria-expanded="false" 
                      aria-controls="biomesList">
                Біоми WWF
              </button>
            </h3>
            <div className="collapse" id="biomesList">
              <ul className="list-group">
                <li class="list-group-item">Помірні широколистяні та мішані ліси</li>
                <li class="list-group-item">Помірні луки, савани і чагарники</li>
                <li class="list-group-item">Гірські луки та чагарники</li>
                <li class="list-group-item">Тропічні та субтропічні луки, савани і чагарники</li>
                <li class="list-group-item">Пустелі і склерофітні чагарники</li>
                <li class="list-group-item">Затоплювані луки і савани</li>
                <li class="list-group-item">Тропічні та субтропічні сухі широколистяні ліси</li>
                <li class="list-group-item">Вологі тропічні ліси</li>
                <li class="list-group-item">Хвойні ліси помірної зони</li>
                <li class="list-group-item">Мангровий ліс</li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}

export default Population;