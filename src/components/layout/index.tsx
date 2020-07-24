import * as React from 'react'
import CSS from 'csstype'
import { Form, Layout, Row, Col, Select, Checkbox, Input, Modal, Tooltip, Slider, Progress } from 'antd'
import { ExclamationCircleOutlined, CopyOutlined, SyncOutlined } from '@ant-design/icons'
import { blue, red } from '@ant-design/colors';

import GoogleAds from '../GoogleAds'

import generatePassword from '../../services/generate-password'
import { languages, languagesText } from '../../services/languages'

interface State {
  passwordLength: number
  includeSymbols: boolean,
  includeNumbers: boolean,
  includeLowercaseCharacters: boolean,
  includeUppercaseCharacters: boolean,
  excludeSimilarCharacters: boolean,
  excludeAmbiguousCharacters: boolean,
  languageId: string,
  password: string
}

class LayoutComponent extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      languageId: 'en',
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
    const elm: any = document.getElementById('password-is-generated')
    elm.select();
    document.execCommand("copy");
  }

  onChangePasswordLength(value) {
    if (value && value.target) {
      value = value.target.value;
    }
    const change = {
      ...this.state,
      passwordLength: +value || 0
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

  onChangeLanguage = (value) => {
    this.setState({
      ...this.state,
      languageId: value
    })

    document.title = languagesText[value].title;
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
    const statusProgress = this.state.passwordLength < 10 ? 'exception' : this.state.passwordLength < 20 ? 'active' : 'success'
    return (
      <Layout>
        <Layout.Header style={{background: '#FFF', textAlign: 'center'}}>
          <div className='title-generator' style={{color: blue[7]}}>{languagesText[this.state.languageId || 'en'].h1}</div>
        </Layout.Header>
        <Row>
            <Col span={2} xs={{offset: 15}} sm={{offset: 17}} md={{offset: 19}} lg={{offset: 21}} style={{position: 'fixed'}}>
              <Select defaultValue={`${languagesText[this.state.languageId].name}`} style={{ width: 120 }} onChange={this.onChangeLanguage.bind(this)}>
                {
                  languages.map((language, index) => <Select.Option key={`lang-${index}`} style={{textAlign: 'center'}} value={language.id}>{language.name}</Select.Option>)
                }
              </Select>
            </Col>
        </Row>
        <Layout.Content style={{padding: '40px'}}>
          <div className="box-generated-password">
            <Row>
              <Col md={{span: 21}} sm={{span: 20}} xs={{span: 16}}>
                <Form>
                  <Input id="password-is-generated" value={this.state.password}/>
                </Form>
              </Col>

              <Col md={{span: 3}} sm={{span: 3}} xs={{span: 8}}>
                <div className="wrapper-icon-generated">
                <Tooltip placement="bottom" title={"Copied!"} trigger="click">
                  <CopyOutlined onClick={this.onCopy} style={{ marginLeft: "10px" }}/>
                </Tooltip>

                <Tooltip placement="bottom" title={"Generated!"} trigger="click">
                  <SyncOutlined onClick={this.onGeneratePassword.bind(this)} style={{ marginLeft: "10px" }}/>
                </Tooltip>
                </div>
              </Col>
            </Row>
            <Progress percent={this.state.passwordLength / 60 * 100} showInfo={false} status={statusProgress}/>
          </div>

          <div className="setting">
            <Row style={rowStyle}>
              <Col span={10} className="text-label">
                {languagesText[this.state.languageId || 'en'].passwordLength}
              </Col>
              <Col span={8}>
                <Slider value={this.state.passwordLength} min={6} max={60} style={{color: red[8]}} onChange={this.onChangePasswordLength.bind(this)}/>
              </Col>
              <Col span={2} offset={1}>
                <Input value={this.state.passwordLength} onChange={this.onChangePasswordLength.bind(this)} />
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className='text-label' span={10}>{languagesText[this.state.languageId || 'en'].includeSymbols}</Col>
              <Col span={8}>
              <Checkbox onChange={this.onChangeIncludeSymbols.bind(this)} checked={this.state.includeSymbols}>
                <span className='text-note' style={{userSelect: 'none'}}>(! @ # $ % *)</span>
              </Checkbox>
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className='text-label' span={10}>{languagesText[this.state.languageId || 'en'].includeNumbers}</Col>
              <Col span={8}>
              <Checkbox onChange={this.onChangeIncludeNumbers.bind(this)} checked={this.state.includeNumbers}>
                <span className='text-note' style={{userSelect: 'none'}}>(0 1 2 3 4 5 6 7 8 9)</span>
              </Checkbox>
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className='text-label' span={10}>{languagesText[this.state.languageId || 'en'].includeLowercaseCharacters}</Col>
              <Col span={8}>
              <Checkbox onChange={this.onChangeIncludeLowercaseCharacters.bind(this)} checked={this.state.includeLowercaseCharacters}>
                <span className='text-note' style={{userSelect: 'none'}}>(a b c d e f g h i k)</span>
              </Checkbox>
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className='text-label' span={10}>{languagesText[this.state.languageId || 'en'].includeUppercaseCharacters}</Col>
              <Col span={8}>
              <Checkbox onChange={this.onChangeIncludeUppercaseCharacters.bind(this)} checked={this.state.includeUppercaseCharacters}>
                <span className='text-note' style={{userSelect: 'none'}}>(A B C D E F G H I K)</span>
              </Checkbox>
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className='text-label' span={10}>{languagesText[this.state.languageId || 'en'].excludeSimilarCharacters}</Col>
              <Col span={8}>
              <Checkbox onChange={this.onChangeExcludeSimilarCharacters.bind(this)} checked={this.state.excludeSimilarCharacters}>
                <span className='text-note' style={{userSelect: 'none'}}>(i l 1 L o 0 O)</span>
              </Checkbox>
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className='text-label' span={10}>{languagesText[this.state.languageId || 'en'].excludeAmbiguousCharacters}</Col>
              <Col span={8}>
              <Checkbox onChange={this.onChangeExcludeAmbiguousCharacters.bind(this)} checked={this.state.excludeAmbiguousCharacters}>
                <span className='text-note' style={{userSelect: 'none'}}>({ } [ ] ( ) / \ ' " ` ~ , ; : . &#60; &#62;)</span>
              </Checkbox>
              </Col>
            </Row>
          </div>
          </Layout.Content>
        <Layout.Footer>
        <GoogleAds
          client='ca-pub-9551612008461721'
          slot='3901664065'
          style={{ display: 'block', height: '250px' }}
          format='auto'
          responsive='true'
        />
        </Layout.Footer>
        </Layout>
    )
  }
}

export default LayoutComponent;