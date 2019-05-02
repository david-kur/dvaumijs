import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import styles from './Customers.css';
import { routerRedux } from 'dva/router';
import CustomerModal from './CustomerModal';
import { PAGE_SIZE } from '../../../Constants';

function Customers({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({ type: 'customers/remove', payload: id });
  }
  function editHandler(id, values) {
    dispatch({ type: 'customers/update', payload: { id, values } });
  }

  function createHandler(values) {
    dispatch({ type: 'customers/create', payload: values });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/customers',
        query: { page },
      }),
    );
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span className={styles.actions}>
          <CustomerModal record={record} onOk={editHandler.bind(null, record.id)}>
            <Button icon="edit">Edit</Button>
          </CustomerModal>
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <Button icon="close">Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <CustomerModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Customer</Button>
          </CustomerModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          title="test"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.customers;
  return {
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Customers);
