import { FormEvent } from 'react';
import pikachuImg from './assets/pikachu.png';
import { addLevelAndTheme } from './data';

export function HomePage() {

  async function handleSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try{
      const formData = new FormData(event.currentTarget);
      const level = Number(formData.get('level'));
      const cardTheme = formData.get('cardTheme');
      const userData = {level, cardTheme};

      await addLevelAndTheme(userData);


      // const req = {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //       // Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      //   },
      //   body: JSON.stringify(userData)
      // };

      // console.log(userData, req)
      // const res = await fetch('/api/level-and-theme', req);
      // if(!res.ok){
      //   throw new Error(`fetch Error ${res.status}`);
      // }
      // const user = await res.json();
      // console.log(user);
    }catch(err) {
      console.log(err);
    }

    // const formData = new FormData(event.currentTarget);
    // const userData = Object.fromEntries(formData.entries());

    // console.log(userData);
  }

  return(
    <div className="container">

      <div className="row">
        <div className="column-full">
          <p>Welcome to the matching cards game,</p>
        </div>
        <div className="column-full">
          <p>Vorleak</p>
        </div>
      </div>

      <div className="row">
        <div className="column-full">
          <img src={pikachuImg} alt="Pikachu" className="img-default-size"/>
        </div>
        <div className="column-full">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="column-full">
                <p>
                  Which level and card theme would you like to play?
                </p>
              </div>
            </div>

            <div className="row">
              <div className="column-full">
                <label>
                    <h3>Level:</h3>
                    <select name="level">
                      <option value="">Select a level</option>
                      <option value="1">Level 1: 6 cards</option>
                      <option value="2">Level 2: 12 cards</option>
                      <option value="3">Level 3: 18 cards</option>
                    </select>
                  </label>
              </div>
            </div>

            <div className="row">
              <div className="column-full">
                <h3>Select the card theme:</h3>
                <div className="row">
                  <div className="column-40">
                    <label className="radioGroup">
                    <input type="radio" name="cardTheme" value="Sunny" defaultChecked={true}/>
                    Sunny
                    </label>
                    <label className="radioGroup">
                      <input type="radio" name="cardTheme" value="river" />
                      River
                    </label>
                    <label className="radioGroup">
                      <input type="radio" name="cardTheme" value="bamboo" />
                      Bamboo
                    </label>
                  </div>

                </div>
              </div>
            </div>

            <div className="row">
              <div className="column-full">
                <button className="btn-1">Play</button>
              </div>
            </div>


          </form>
        </div>
      </div>
    </div>

  )
}
