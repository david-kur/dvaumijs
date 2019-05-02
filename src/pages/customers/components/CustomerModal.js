import { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class CustomerEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModalHandler = e => {
    if (e) e.stopPropagation();
    this.setState({ visible: true });
  };

  hideModalHandler = () => {
    this.setState({ visible: false });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModalHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, address } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <span onClick={this.showModalHandler}>{children}</span>
        <Modal
          title={this.props.record.id ? 'Edit Customer' : 'New Customer'}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form horizontal="true" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="Name">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [{ required: true, message: 'Please input name' }],
              })(<Input placeholder="Name" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Address">
              {getFieldDecorator('address', {
                initialValue: address,
                rules: [{ required: true, message: 'Please input address' }],
              })(<Input placeholder="Address" />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(CustomerEditModal);
