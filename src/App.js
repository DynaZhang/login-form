import {useState} from 'react';
import './App.css';
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

function App() {
  const [currentTab, setCurrentTab] = useState('sign_up');
  const onTabChange = (tab) => {
    setCurrentTab(tab);
  }

  return (
    <div className="login-wrapper">
      <h4 className="login-wrapper-title">
        <span
          onClick={() => {onTabChange('sign_in')}}
          className={currentTab === 'sign_in' ? 'active' : ''}
        >
          登录
        </span>
        <b>·</b>
        <span
          onClick={() => {onTabChange('sign_up')}}
          className={currentTab === 'sign_up' ? 'active' : ''}
        >
          注册
        </span>
      </h4>
      <div className="login-wrapper-content">
        {
          currentTab === 'sign_up' ? <SignUpForm /> : <SignInForm />
        }
      </div>
    </div>
  );
}

export default App;
