import React from 'react';
import Table from '../';
import { submit } from '../../form/demos/common';

export default class Baisc extends React.Component {
  render() {
    return (
      <Table
        rowKey={(record) => {
          return record.login.uuid;
        }}
        actionsRender={[
          {
            type: 'button',
            props: {
              children: 'Hello',
            },
            action: {
              type: 'modalform',
              title: '弹窗表单',
              fields: [{
                name: 'input1',
                label: 'Input1',
                field: 'input',
              }],
              submit
            },
          },
        ]}
        columns={[
          {
            key: 'name',
            title: 'Name',
            sorter: true,
            render: (ctx) => {
              return (
                <b>
                  {ctx.record.name.first} {ctx.record.name.last}
                </b>
              );
            },
          },
          {
            key: 'phone',
            title: 'Phone',
          },
          {
            key: 'age',
            title: 'Age',
            sorter: true,
            dataIndex: ['registered', 'age'],
          },
          {
            key: 'nat',
            title: 'Nation',
            filterMultiple: false,
            filters: [{ text: 'FR', value: 'FR' }],
          },
          {
            key: 'operation',
            title: 'Operation',
            render: [
              {
                type: 'button',
                props: {
                  size: 'small',
                  type: 'danger',
                  children: '删除',
                },
                action(ctx) {
                  console.log('ctx: ', ctx);
                },
              },
              {
                type: 'button',
                props: {
                  children: 'Hello',
                },
                action: {
                  type: 'drawerform',
                  title: '抽屉表单',
                  fields: [{
                    name: 'input1',
                    label: 'Input1',
                    field: 'input',
                  }],
                  submit
                },
              },
            ],
          },
        ]}
        remoteDataSource={{
          url: 'https://randomuser.me/api',
          method: 'get',
          params: { // 额外参数
            name: 'sula',
          },
          converter: ({ data }) => {
            const { results, info } = data;
            return {
              list: results.map((item, index) => {
                return {
                  ...item,
                  level: index % 2 ? 'Medium' : 'High',
                };
              }),
              total: info.results.length,
            };
          },
        }}
      />
    );
  }
}