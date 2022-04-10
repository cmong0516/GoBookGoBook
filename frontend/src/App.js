
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="radio">
                <form action="/home" method="POST">
                    <div>
                        <input type="radio" id="one" name="movieTitle" value="첫번째 영화"></input>
                        <label for="one">첫번째 제목</label>
                    </div>
                    <div>
                        <input type="radio" id="two" name="movieTitle" value="두번째 영화"></input>
                        <label for="two">두번째 제목</label>
                    </div>
                    <div>
                        <input type="radio" id="three" name="movieTitle" value="세번째 영화"></input>
                        <label for="three">세번째 제목</label>
                    </div>
                    <div>
                        <input type="radio" id="four" name="movieTitle" value="네번째 영화"></input>
                        <label for="four">네번째 제목</label>
                    </div>
                    <div>
                        <input type="radio" id="five" name="movieTitle" value="다섯번째 영화"></input>
                        <label for="five">다섯번째 제목</label>
                    </div>
                    <p>
                        <input type="submit" value="Submit"></input>
                        <input type="reset" value="Reset"></input>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default App;
