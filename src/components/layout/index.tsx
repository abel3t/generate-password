import * as React from 'react'
import CSS from 'csstype'
import { Layout, Row, Col, Select, Checkbox, Button, Input, Modal, Tooltip } from 'antd'
import { ExclamationCircleOutlined, CopyTwoTone } from '@ant-design/icons'

import generatePassword from '../../services/generate-password'

interface State {
  passwordLength: number
  includeSymbols: boolean,
  includeNumbers: boolean,
  includeLowercaseCharacters: boolean,
  includeUppercaseCharacters: boolean,
  excludeSimilarCharacters: boolean,
  excludeAmbiguousCharacters: boolean,
  password: string
}

class LayoutComponent extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      passwordLength: 6,
      includeSymbols: true,
      includeNumbers: true,
      includeLowercaseCharacters: true,
      includeUppercaseCharacters: true,
      excludeSimilarCharacters: true,
      excludeAmbiguousCharacters: false,
      password: ''
    }
  }

  onCopy = () => {
    const elm: any = document.getElementById('password')
    elm.select();
    document.execCommand("copy");
  }

  onChangePasswordLength(value) {
    const change = {
      ...this.state,
      passwordLength: +value
    }
    change.password = this.generatePassword({ ...change }) || ''
    this.setState({...change })
  }
  
  onChangeIncludeSymbols = (event) => {
    const change = {
      ...this.state,
      includeSymbols: event.target.checked
    }
    change.password = this.generatePassword({ ...change }) || ''
    this.setState({ ...change })
  }

  onChangeIncludeNumbers = (event) => {
    const change = {
      ...this.state,
      includeNumbers: event.target.checked
    }
    change.password = this.generatePassword({ ...change }) || ''
    this.setState({ ...change })
  }

  onChangeIncludeLowercaseCharacters = (event) => {
    const change = {
      ...this.state,
      includeLowercaseCharacters: event.target.checked
    }
    change.password = this.generatePassword({ ...change }) || ''
    this.setState({ ...change })
  }

  onChangeIncludeUppercaseCharacters = (event) => {
    const change = {
      ...this.state,
      includeUppercaseCharacters: event.target.checked
    }
    change.password = this.generatePassword({ ...change }) || ''
    this.setState({ ...change })
  }

  onChangeExcludeSimilarCharacters = (event) => {
    const change = {
      ...this.state,
      excludeSimilarCharacters: event.target.checked
    }
    change.password = this.generatePassword({ ...change }) || ''
    this.setState({ ...change })
  }

  onChangeExcludeAmbiguousCharacters = (event) => {
    const change = {
      ...this.state,
      excludeAmbiguousCharacters: event.target.checked
    }
    change.password = this.generatePassword({...change}) || ''
    this.setState({ ...change })
  }

  onGeneratePassword = () => {
    this.setState({
      ...this.state,
      password: this.generatePassword({ ...this.state })
    })
  }

  generatePassword = (args: any) => {
    const {
      passwordLength,
      includeSymbols,
      includeNumbers,
      includeLowercaseCharacters,
      includeUppercaseCharacters,
      excludeSimilarCharacters,
      excludeAmbiguousCharacters
    } = args;
    
    if (includeSymbols || includeNumbers || includeLowercaseCharacters || includeUppercaseCharacters) {
      return generatePassword(passwordLength, {
        includeSymbols,
        includeNumbers,
        includeLowercaseCharacters,
        includeUppercaseCharacters,
        excludeSimilarCharacters,
        excludeAmbiguousCharacters
      })
    } else {
      this.showModalError();
      return;
    }
  }

  showModalError = () => {
    Modal.confirm({
      title: 'Missing Include',
      icon: <ExclamationCircleOutlined />,
      content: 'You have to choose one include option!'
    });
  }

  render() {
    const rowStyle: CSS.Properties = {padding: '10px', fontSize: '15px', fontWeight: 450};
    const weakPassword = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const strongPassword = [16, 17, 18, 19, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100];
    const amazingPassword = [256, 512, 1024, 2048];

    return (
      <Layout>
        <Layout.Header style={{background: '#FFF', textAlign: 'center'}}>
          <h1>Secure Password</h1>
        </Layout.Header>
        <hr />
        <Layout.Content style={{paddingLeft: '40px'}}>
          <Row style={rowStyle}>
            <Col span={8}>
              Password Length
            </Col>
            <Col span={8}>
              <Select defaultValue={`${this.state.passwordLength}`} style={{ width: 90 }} onChange={this.onChangePasswordLength.bind(this)}>
                
                <Select.OptGroup label="Weak">
                  {
                    weakPassword.map((password, index) => <Select.Option key={`week-${index}`} style={{textAlign: 'center'}} value={password}>{password}</Select.Option>)
                  }
                </Select.OptGroup>

                <Select.OptGroup label="Strong">
                  {
                    strongPassword.map((password, index) => <Select.Option key={`strong-${index}`} style={{textAlign: 'center'}} value={password}>{password}</Select.Option>)
                  }
                </Select.OptGroup>
              
                <Select.OptGroup label="Amazing">
                {
                  amazingPassword.map((password, index) => <Select.Option key={`amazing-${index}`} style={{textAlign: 'center'}} value={password}>{password}</Select.Option>)
                }
                </Select.OptGroup>
              </Select>
            </Col>
          </Row>

          <Row style={rowStyle}>
            <Col span={8}>Include Symbols:</Col>
            <Col span={8}>
            <Checkbox onChange={this.onChangeIncludeSymbols.bind(this)} checked={this.state.includeSymbols}>
              <span style={{userSelect: 'none'}}>(!@#$%)</span>
            </Checkbox>
            </Col>
          </Row>

          <Row style={rowStyle}>
            <Col span={8}>Include Numbers:</Col>
            <Col span={8}>
            <Checkbox onChange={this.onChangeIncludeNumbers.bind(this)} checked={this.state.includeNumbers}>
              <span style={{userSelect: 'none'}}>0123456789</span>
            </Checkbox>
            </Col>
          </Row>

          <Row style={rowStyle}>
            <Col span={8}>Include Lowercase Characters:</Col>
            <Col span={8}>
            <Checkbox onChange={this.onChangeIncludeLowercaseCharacters.bind(this)} checked={this.state.includeLowercaseCharacters}>
              <span style={{userSelect: 'none'}}>(abcdefghik)</span>
            </Checkbox>
            </Col>
          </Row>

          <Row style={rowStyle}>
            <Col span={8}>Include Uppercase Characters</Col>
            <Col span={8}>
            <Checkbox onChange={this.onChangeIncludeUppercaseCharacters.bind(this)} checked={this.state.includeUppercaseCharacters}>
              <span style={{userSelect: 'none'}}>(ABCDEFGHIK)</span>
            </Checkbox>
            </Col>
          </Row>

          <Row style={rowStyle}>
            <Col span={8}>Exclude Similar Characters:</Col>
            <Col span={8}>
            <Checkbox onChange={this.onChangeExcludeSimilarCharacters.bind(this)} checked={this.state.excludeSimilarCharacters}>
              <span style={{userSelect: 'none'}}>( i, l, 1, L, o, 0, O)</span>
            </Checkbox>
            </Col>
          </Row>

          <Row style={rowStyle}>
            <Col span={8}>Exclude Ambiguous Characters:</Col>
            <Col span={8}>
            <Checkbox onChange={this.onChangeExcludeAmbiguousCharacters.bind(this)} checked={this.state.excludeAmbiguousCharacters}>
              <span style={{userSelect: 'none'}}>({ } [ ] ( ) / \ ' " ` ~ , ; : . &#60; &#62; )</span>
            </Checkbox>
            </Col>
          </Row>

          <Row style={rowStyle}>
            <Col span={8}>
              <Button type="primary" onClick={this.onGeneratePassword.bind(this)}>Generate Password</Button>
            </Col>
          </Row>

          <Row style={rowStyle}>
            <Col span={8}>Your password:</Col>
            <Col span={6}>
              <Input value={this.state.password} id={"password"}/>
            </Col>
            <Col span={1}>
            <Tooltip placement="bottom" title={"Copied!"} trigger="click">
              <Button onClick={this.onCopy}>
              <CopyTwoTone className={"copy-icon"}/>
              </Button>
            </Tooltip>
            </Col>
          </Row>
  
        </Layout.Content>
      </Layout>
    )
  }
}

export default LayoutComponent;