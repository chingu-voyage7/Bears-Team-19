import React from 'react'
import { Link } from 'react-router-dom'
import AccountsMobileImage from '../../assets/AccountsMobile.jpg'
import ChartsMobileImage from '../../assets/ChartsMobile.jpg'
import DashboardMobileImage from '../../assets/DashboardMobile.jpg'
import TransactionsImage from '../../assets/TransactionMobile.jpg'
import './Home.css'

const Home = () => (
  <>
    <section className="above-fold">
      <article>
        <h1>Keep track of your spending all in one place</h1>
        <button className="button is-success button-join">
          <Link className="join-link" to="/signup">
            Join us
          </Link>
        </button>
      </article>
    </section>
    <section className="features">
      <h2>Features</h2>
      <div className="featurelist">
        <article className="feature">
          <h3>Add your accounts</h3>
          <p>
            Keep track of all your accounts in one place! You can add as many
            accounts as you want. For example savings account, spending account.
            Maybe you have an account specifically for travel. You can add that
            too.
          </p>
          <figure className="feature-image">
            <img src={AccountsMobileImage} alt="Accounts" />
          </figure>
        </article>
        <article className="feature">
          <h3>Transactions</h3>
          <figure className="feature-image">
            <img src={TransactionsImage} alt="Transactions" />
          </figure>
          <p>
            Add both spending and income transactions in an easy and quick
            manor.
          </p>
        </article>
        <article className="feature">
          <h3>Select your currency</h3>
          <p>Set which currency you want to see everything in.</p>
          <figure className="feature-image">
            <img src={DashboardMobileImage} alt="Dashboard select currency" />
          </figure>
        </article>
        <article className="feature">
          <h3>Charts</h3>
          <p>
            View your spending across your accounts and in total in a nice and
            easy to understand way through our charts. There you can check out
            what you spend on and when.
          </p>
          <figure className="feature-image">
            <img src={ChartsMobileImage} alt="Dashboard Charts" />
          </figure>
        </article>
      </div>
    </section>
    <section className="quotes">
      <article className="quote">
        <figure className="quote-image">
          <img
            src="https://dummyimage.com/150x150/a3a3a3/fff.jpg"
            alt="placeholder user"
          />
        </figure>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right
        </p>
      </article>
      <article className="quote">
        <figure className="quote-image">
          <img
            src="https://dummyimage.com/150x150/a3a3a3/fff.jpg"
            alt="placeholder user"
          />
        </figure>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right
        </p>
      </article>
      <article className="quote">
        <figure className="quote-image">
          <img
            src="https://dummyimage.com/150x150/a3a3a3/fff.jpg"
            alt="placeholder user"
          />
        </figure>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right
        </p>
      </article>
      <article className="quote">
        <figure className="quote-image">
          <img
            src="https://dummyimage.com/150x150/a3a3a3/fff.jpg"
            alt="placeholder user"
          />
        </figure>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right
        </p>
      </article>
      <article className="quote">
        <figure className="quote-image">
          <img
            src="https://dummyimage.com/150x150/a3a3a3/fff.jpg"
            alt="placeholder user"
          />
        </figure>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right
        </p>
      </article>
    </section>
  </>
)

export default Home
