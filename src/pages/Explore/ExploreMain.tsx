import React from "react"
import style from "@styles/Explore/ExploreMain.module.css"

function ExploreMain() {
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <header className={style.header}>
          <aside className={style.header_aside}>
            <select name="select" id="select">
              <option value="time">가입순</option>
              <option value="popular">인기순</option>
            </select>
          </aside>
          <main className={style.header_main}>
            <div className={style.header_background}></div>
            <div>Profile</div>
            <div>NickName</div>
            <div>Visitor</div>
            <div></div>
          </main>
        </header>
        <main className={style.main}>
          <ul className={style.main_upperlist}>
            <li className={style.main_list}>
              <div className={style.main_background}></div>
              <div>
                <img></img>
              </div>
              <div>olsohee</div>
              <div>1000</div>
              <div>
                <button>방문</button>
              </div>
            </li>
            <li className={style.main_list}>
              <div className={style.main_background}></div>
              <div>
                <img></img>
              </div>
              <div>olsohee</div>
              <div>1000</div>
              <div>
                <button>방문</button>
              </div>
            </li>
            <li className={style.main_list}>
              <div className={style.main_background}></div>
              <div>
                <img></img>
              </div>
              <div>olsohee</div>
              <div>1000</div>
              <div>
                <button>방문</button>
              </div>
            </li>
            <li className={style.main_list}>
              <div className={style.main_background}></div>
              <div>
                <img></img>
              </div>
              <div>olsohee</div>
              <div>1000</div>
              <div>
                <button>방문</button>
              </div>
            </li>
            <li className={style.main_list}>
              <div className={style.main_background}></div>
              <div>
                <img></img>
              </div>
              <div>olsohee</div>
              <div>1000</div>
              <div>
                <button>방문</button>
              </div>
            </li>
            <li className={style.main_list}>
              <div className={style.main_background}></div>
              <div>
                <img></img>
              </div>
              <div>olsohee</div>
              <div>1000</div>
              <div>
                <button>방문</button>
              </div>
            </li>
          </ul>
        </main>
      </section>
    </div>
  )
}

export default ExploreMain
