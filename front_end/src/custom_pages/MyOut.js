import React from 'react';
import { Table, Input, Button, Popover, Modal } from 'antd';
import moment from 'moment';
import NewOutItem from '../custom_components/NewOutItem';
import '../custom_styles/my_out.css';

var data = [ {
  key: '2',
  appId: '20161227002',
  workId: '201612003',
  username: 'yuyiding',
  time: moment({years: '2016', months: '8', date: '22'}).format("YYYY-MM-DD"),
  type: '招聘',
  days: 7,
  place: 'aaa',
  reason: 'aaa',
  appTime: moment({years: '2016', months: '8', date: '16'}).format("YYYY-MM-DD"),
  appStatus: '待审批',
  appType: 0,
  }, {
    key: '3',
    appId: '20161227003',
    workId: '201612003',
    username: 'yuyiding',
    time: moment({years: '2016', months: '8', date: '22'}).format("YYYY-MM-DD"),
    type: '招聘',
    days: 7,
    place: 'aaa',
    reason: 'aaa',
    appTime: moment({years: '2016', months: '8', date: '16'}).format("YYYY-MM-DD"),
    appStatus: '已通过',
    appType: 0,
  }];

class MyOut extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      filterDropdownVisible: false,
      data: data,
      searchText: '',
      addModalVisible: false,
    };
  }

  onInputChange=(e) => {
    const value = e.target.value;
    this.setState((prevState, props) => ({
      searchText: value,
    }));
  }

  onSearch=() => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState((prevState, props) => ({
      filterDropdownVisible: false,
      data: data.map((record) => {
        const match = record.type.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          type: (
            <span>
              {record.type.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    }));
  }

  formSubmit=(values) => {
    values.appStatus='待审批';
    values.appTime=moment().format("YYYY-MM-DD");
    data.unshift(values);
    this.setState((prevState, props) => ({
      addModalVisible: false,
    }));
  }

  render () {
    const columns = [{
      title: '外出类型',
      dataIndex: 'type',
      key: 'type',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            size="small"
            placeholder="搜索类型"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button size="small" type="primary" onClick={this.onSearch}>搜索</Button>
        </div>
      ),
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState((prevState, props) => ({
         filterDropdownVisible: visible
       })),
    },{
      title: '申请日期',
      dataIndex: 'appTime',
      key: 'appTime',
      sorter: (a, b) => a.appTime - b.appTime,
    },{
      title: '外出日期',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => a.time - b.time,
    },{
      title: '外出天数',
      dataIndex: 'days',
      key: 'days',
      sorter: (a, b) => a.days - b.days,
    }, {
      title: '外出地点',
      dataIndex: 'place',
      key: 'place',
    },{
      title: '详细原因',
      dataIndex: 'reason',
      key: 'reason',
      render: (text, record) => <Popover content={text}><span>{text.substr(0,10)}{text.length >= 10 && '...'}</span></Popover>,
    },{
      title: '申请状态',
      dataIndex: 'appStatus',
      key: 'appStatus',
      filters: [{
        text: '已通过',
        value: '已通过',
      },{
        text: '已驳回',
        value: '已驳回',
      },{
        text: '待审批',
        value: '待审批',
      }],
      onFilter: (value, record) => record.reason.indexOf(value) === 0,
    }];

    const pagination = {
      total: this.state.data.length,
      defaultPageSize: 10,
      simple: 'simple',
    }

    return (
      <div>
        <p className='float-element' >共{this.state.data.length}条申请</p>
        <Button type='primary' icon='plus' className='float-element-button' onClick={() => this.setState(() => ({addModalVisible: true}))}>添加</Button>
        <Modal
          title="申请新的外出" closable={false} maskClosable={false}
          wrapClassName='vertical-center-modal'
          visible={this.state.addModalVisible}
          footer={null}
          >
          <NewOutItem formSubmit={this.formSubmit} formCancel={() => this.setState(() => ({addModalVisible: false}))} />
        </Modal>
        <h3 style={{marginBottom: '1.5rem'}}>外出申请</h3>
        <Table columns={columns} dataSource={this.state.data} pagination={pagination} />
      </div>
    );
  }
}

export default MyOut;


/*设置modal的footer属性为{footer}*/
// const footer =
//               <div>
//                 <Button type='ghost' onClick={() => this.setAddModalVisible(false)} style={{float: 'left', marginLeft: '1rem',}}>取消</Button>
//                 <Button type='primary' onClick={() => this.setAddModalVisible(false)} style={{marginRight: '0.5rem',}}>确定</Button>
//               </div>;
