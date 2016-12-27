import React, { Component } from 'react';
import auth from '../custom_components/auth';
import { Link, } from 'react-router';
import { Menu, Breadcrumb, Button, Icon } from 'antd';
import 'antd/dist/antd.min.css';
import '../custom_styles/main_layout.css';
import logoURL from '../custom_components/logo.png';
const SubMenu = Menu.SubMenu;

const headURL = "http://img.116s.com/2015-06/17/143455142000011.jpg";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
    };
  }

  fetchData=() => {
    fetch('http://end.attendsys.com:3000/staffAccount', {
      method: 'POST',
      mode: 'cors',
      data: {
          token: auth.getToken(),
          workId: auth.getAccount(),
        }
    }).then(function(res) {
      if(res.status === 'ok') {
        return res.json()
      }else {
        return ''
      }
    }).then(function(data) {
      return data
    })
  };


  onCollapseChange() {
    this.setState((prevState, props) => ({
      collapse: !prevState.collapse,
    }));
  }

  handleClick=() => {
    auth.logout();
  }

  render() {
    const collapse = this.state.collapse;
    var UncheckedSubMenu = (
      <SubMenu key="notification" title={<span className="nav-text"><Icon type="notification" />{!collapse && '待审批申请'}</span>} >
         <Menu.Item key="1">
           <Link to="/mainpage/wait/staffout">
           <Icon type="rocket" />
             {!collapse && '员工外出申请'}
           </Link>
         </Menu.Item>
         <Menu.Item key="2">
           <Link to="/mainpage/wait/staffleave">
           <Icon type="clock-circle-o" />
             {!collapse && '员工请假申请'}
           </Link>
         </Menu.Item>
      </SubMenu>
    );

     var CheckedSubMenu = (
       <SubMenu key="copy" title={<span className="nav-text"><Icon type="copy" />{!collapse && '已审批申请'}</span>} >
          <Menu.Item key="3">
            <Link to="/mainpage/already/staffout">
            <Icon type="rocket" />
              {!collapse && '员工外出申请'}
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/mainpage/already/staffleave">
            <Icon type="clock-circle-o" />
              {!collapse && '员工请假申请'}
            </Link>
          </Menu.Item>
        </SubMenu>
     );

    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"><img src={logoURL} alt="" /><h3 style={{padding: 4}} >考勤系统</h3></div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['calendar']} >

            <Menu.Item key="calendar">
              <Link to="/mainpage/myattendence">
              <Icon type="calendar" />
              {!collapse && <span className="nav-text">我的打卡记录</span>}
              </Link>
            </Menu.Item>

            <Menu.Item key="user">
              <Link to="/mainpage/myout">
              <Icon type="user" />
              {!collapse && <span className="nav-text">我的外出</span>}
              </Link>
            </Menu.Item>

            <Menu.Item key="book">
              <Link to="/mainpage/myleave">
              <Icon type="book" />
              {!collapse && <span className="nav-text">我的请假</span>}
              </Link>
            </Menu.Item>

            {this.props.account.position > 0 && UncheckedSubMenu}
            {this.props.account.position > 0 && CheckedSubMenu}

          </Menu>

          <div className="ant-aside-action" onClick={() => this.onCollapseChange()}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>

        <div className="ant-layout-main">
          <div className="ant-layout-header">
            <div className="ant-layout-ceiling">
              {this.state.collapse ?
                <div className="ant-layout-wrapper right-collapsed">
                  Hello, {this.props.account.username} &nbsp;
                  <Link to="/login"><Button size="small" onClick={this.handleClick}>Logout</Button></Link>
                </div>
                :
                <div className="ant-layout-wrapper right-uncollapse">
                  Hello, {this.props.account.username} &nbsp;
                  <Link to="/login"><Button size="small" onClick={this.handleClick}>Logout</Button></Link>
                </div>
              }
              <img src={headURL} alt="header" className="header-img" />
            </div>
          </div>
          <div className="ant-layout-breadcrumb">
            <Breadcrumb routes={this.props.routes} params={this.props.params} />
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div className="content-layout-height">
                {this.props.children}
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
          This Page is Powered by © 2016 YuFujia .
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;

/*
* componentWillMount() {
*   this.setState((prevStatem, props) => ({
*     account: JSON.parse(auth.getAccount()),
*   }));
* }
*/
