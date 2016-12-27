import React from 'react';
import { Table, Input, Button, Popover } from 'antd';
import moment from 'moment';
import '../custom_styles/staff.css';

var data = [{
  key: '1',
  appId: '20161227001',
  workId: '201612003',
  username: 'yuergou',
  time: moment({years: '2015', months: '2', date: '12'}).format("YYYY-MM-DD"),
  type: '婚假',
  days: 24,
  reason: '去深圳参加公司组织的年度技术培训',
  appTime: moment({years: '2015', months: '2', date: '6'}).format("YYYY-MM-DD"),
  appStatus: '待审批',
  appType: 0,
  }, {
    key: '2',
    appId: '20161227002',
    workId: '201612003',
    username: 'yuyiding',
    time: moment({years: '2016', months: '8', date: '22'}).format("YYYY-MM-DD"),
    type: '年假',
    days: 7,
    reason: '参与华科武大的2017届校园招聘',
    appTime: moment({years: '2016', months: '8', date: '16'}).format("YYYY-MM-DD"),
    appStatus: '待审批',
    appType: 0,
  }, {
    key: '3',
    appId: '20161227003',
    workId: '201612003',
    username: 'yuyiding',
    time: moment({years: '2016', months: '8', date: '22'}).format("YYYY-MM-DD"),
    type: '病假',
    days: 2,
    reason: '参与华科武大的2017届校园招聘',
    appTime: moment({years: '2016', months: '8', date: '16'}).format("YYYY-MM-DD"),
    appStatus: '已通过',
    appType: 0,
  }];


class StaffLeave extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      filterDropdownVisible: false,
      data: data,
      searchText: '',
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

  render () {
    var waitCheckColumn = {
      title: '审核操作',
      key: 'check',
      render: (text, record) => <div>
                                  <Button onClick={() => {
                                      record.appStatus='已通过';
                                      this.setState((prevState, props)=>({data: data}));
                                    }}
                                    className='check-button' size='small' shape='circle' icon='check'/>
                                  <Button onClick={() => {
                                      record.appStatus='已驳回';
                                      this.setState((prevState, props)=>({data: data}));
                                    }}
                                    className='reject-button' size='small' shape='circle' icon='close' />
                                </div>,
    };

    var alreadyCheckColumn = {
      title: '审核状态',
      dataIndex: 'appStatus',
      key: 'checkStatus',
    };

    const columns = [{
      title: '申请编号',
      dataIndex: 'appId',
      key: 'appId',
    },{
      title: '申请人',
      dataIndex: 'username',
      key: 'username',
    },{
      title: '请假类型',
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
      title: '请假日期',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => a.time - b.time,
    },{
      title: '请假天数',
      dataIndex: 'days',
      key: 'days',
      sorter: (a, b) => a.days - b.days,
    },{
      title: '详细原因',
      dataIndex: 'reason',
      key: 'reason',
      render: (text, record) => <Popover content={text}><span>{text.substr(0,10)}{text.length >= 10 && '...'}</span></Popover>,
    },this.props.pagename === 'wait' ? waitCheckColumn : alreadyCheckColumn ];

    const pagination = {
      total: this.state.data.length,
      defaultPageSize: 10,
      simple: 'simple',
    }

    console.log('pagename', this.props.pagename);
    console.log('state data', this.state.data);

    return (
      <div>
        <p className='float-element' >共{this.state.data.length}条申请</p>
        <h3 style={{marginBottom: '1.5rem'}}>外出申请</h3>
        <Table columns={columns} dataSource={this.state.data.filter((item) => {
            return this.props.pagename === 'wait' ? item.appStatus === '待审批' : item.appStatus !== '待审批';
          })} pagination={pagination} />
      </div>
    );
  }
}

export default StaffLeave;
