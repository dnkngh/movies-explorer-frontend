import AboutProject from '../AboutProject/AboutProject';
import LandingNavTab from '../LandingNavTab/LandingNavTab';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio'

function Main() {
  return (
    <main className='main'>
      <Promo />
      <LandingNavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
