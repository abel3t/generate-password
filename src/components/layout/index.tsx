import * as React from 'react';
import CSS from 'csstype';
import {
  Form,
  Layout,
  Row,
  Col,
  Select,
  Checkbox,
  Input,
  Modal,
  Tooltip,
  Slider,
  Progress,
} from 'antd';
import {
  ExclamationCircleOutlined,
  CopyOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { blue, red, orange } from '@ant-design/colors';

// import GoogleAds from '../GoogleAds'

import generatePassword from '../../services/generate-password';
import { languages, languagesText } from '../../services/languages';

interface State {
  passwordLength: number;
  includeSymbols: boolean;
  includeNumbers: boolean;
  includeLowercaseCharacters: boolean;
  includeUppercaseCharacters: boolean;
  excludeSimilarCharacters: boolean;
  excludeAmbiguousCharacters: boolean;
  languageId: string;
  password: string;
  isLoaded: boolean;
  inputPasswordLength: string;
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
      password: '',
      isLoaded: false,
      inputPasswordLength: 'none',
    };
  }

  componentDidMount() {
    let config: State =
      JSON.parse(localStorage.getItem('config')) || this.state;
    let lang = config.languageId || navigator.language;
    if (!languagesText[lang]) {
      lang = 'en';
    }

    this.setState({
      ...config,
      password: this.generatePassword({ ...config }),
      isLoaded: true,
      languageId: lang,
    });
  }

  setConfig2Storage(config) {
    localStorage.setItem('config', JSON.stringify(config));
  }

  onCopy = () => {
    const elm: any = document.getElementById('password-is-generated');
    elm.select();
    document.execCommand('copy');
    elm.blur();
  };

  onChangePasswordLength(value) {
    if (Number.isInteger(value)) {
      const change = {
        ...this.state,
        passwordLength: +value || 6,
      };
      change.password = this.generatePassword({ ...change }) || '';
      this.setConfig2Storage({ ...change });
      this.setState({ ...change });
    }
  }

  onKeyDown(event) {
    if (this.state.passwordLength > 6 && event.keyCode === 8) {
      const change = {
        ...this.state,
        password: this.state.password.slice(0, -1),
        passwordLength: this.state.passwordLength - 1,
      };
      this.setConfig2Storage({ ...change });
      this.setState({ ...change });
    }
  }

  onChangeIncludeSymbols = (event) => {
    const change = {
      ...this.state,
      includeSymbols: event.target.checked,
    };
    change.password = this.generatePassword({ ...change }) || '';
    this.setConfig2Storage({ ...change });
    this.setState({ ...change });
  };

  onChangeIncludeNumbers = (event) => {
    const change = {
      ...this.state,
      includeNumbers: event.target.checked,
    };
    change.password = this.generatePassword({ ...change }) || '';
    this.setConfig2Storage({ ...change });
    this.setState({ ...change });
  };

  onChangeIncludeLowercaseCharacters = (event) => {
    const change = {
      ...this.state,
      includeLowercaseCharacters: event.target.checked,
    };
    change.password = this.generatePassword({ ...change }) || '';
    this.setConfig2Storage({ ...change });
    this.setState({ ...change });
  };

  onChangeIncludeUppercaseCharacters = (event) => {
    const change = {
      ...this.state,
      includeUppercaseCharacters: event.target.checked,
    };
    change.password = this.generatePassword({ ...change }) || '';
    this.setConfig2Storage({ ...change });
    this.setState({ ...change });
  };

  onChangeExcludeSimilarCharacters = (event) => {
    const change = {
      ...this.state,
      excludeSimilarCharacters: event.target.checked,
    };
    change.password = this.generatePassword({ ...change }) || '';
    this.setConfig2Storage({ ...change });
    this.setState({ ...change });
  };

  onChangeExcludeAmbiguousCharacters = (event) => {
    const change = {
      ...this.state,
      excludeAmbiguousCharacters: event.target.checked,
    };
    change.password = this.generatePassword({ ...change }) || '';
    this.setConfig2Storage({ ...change });
    this.setState({ ...change });
  };

  onGeneratePassword = () => {
    const timeout = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    document.getElementById('icon-gen').setAttribute('id', 'icon-generate');
    timeout(250)
      .then(() => {
        document.getElementById('icon-generate').setAttribute('id', 'icon-gen');
        const change = {
          ...this.state,
          password: this.generatePassword({ ...this.state }),
        };
        this.setConfig2Storage({
          ...change,
          password: this.generatePassword({ ...this.state }),
        });
        this.setState({ ...change });
      })
      .catch((error) => console.log(error));
  };

  onChangeLanguage = (value) => {
    const change = {
      ...this.state,
      languageId: value,
    };
    document.title = languagesText[value].title;
    this.setConfig2Storage({ ...change });

    this.setState({ ...change });
  };

  onInputKeyDown(event) {
    const code = event.keyCode;
    if (code === 13 || code === 27) {
      document.getElementById('input-length').blur();
    }
  }

  onInputBlur(event) {
    if (event?.target?.value) {
      let value = +event?.target?.value;
      if (value < 6) {
        value = 6;
      }
      if (value > 60) {
        value = 60;
      }

      const change = {
        ...this.state,
        passwordLength: value,
        inputPasswordLength: 'none',
      };
      change.password = this.generatePassword({ ...change });

      this.setConfig2Storage({ ...change });
      this.setState({ ...change });
    }
  }

  onInputChange(event) {
    let { value } = event.target;
    if (value === '') {
      value = 0;
    }

    if (Number.isInteger(+value)) {
      this.setState({
        ...this.state,
        inputPasswordLength: event.target.value,
      });
    }
  }

  generatePassword = (args: any) => {
    const {
      passwordLength,
      includeSymbols,
      includeNumbers,
      includeLowercaseCharacters,
      includeUppercaseCharacters,
      excludeSimilarCharacters,
      excludeAmbiguousCharacters,
    } = args;

    if (
      includeSymbols ||
      includeNumbers ||
      includeLowercaseCharacters ||
      includeUppercaseCharacters
    ) {
      return generatePassword(passwordLength, {
        includeSymbols,
        includeNumbers,
        includeLowercaseCharacters,
        includeUppercaseCharacters,
        excludeSimilarCharacters,
        excludeAmbiguousCharacters,
      });
    } else {
      this.showModalError();
      return;
    }
  };

  showModalError = () => {
    Modal.confirm({
      title: 'Missing Include',
      icon: <ExclamationCircleOutlined />,
      content: 'You have to choose one include option!',
    });
  };

  render() {
    const rowStyle: CSS.Properties = {
      padding: '10px',
      fontSize: '15px',
      fontWeight: 450,
    };
    let strokeColor;
    let trailColor;
    const { passwordLength } = this.state;
    const statusProgress = passwordLength == 60 ? 'success' : 'active';
    if (passwordLength < 10) {
      strokeColor = '#ff4d4f';
      trailColor = red[0];
    } else if (passwordLength < 20) {
      strokeColor = '#F19B2B';
      trailColor = orange[0];
    } else if (passwordLength < 30) {
      strokeColor = '#98CB6F';
      trailColor = '#F4F9F0';
    } else if (passwordLength < 60) {
      strokeColor = '#5FD889';
      trailColor = '#EFFBF3';
    } else {
      strokeColor = '#52c41a';
    }

    return this.state.isLoaded ? (
      <Layout>
        <div className="title-generator" style={{ color: blue[7] }}>
          {languagesText[this.state.languageId || 'en'].h1}
        </div>
        <Row>
          <Col
            span={2}
            xs={{ offset: 15 }}
            sm={{ offset: 17 }}
            md={{ offset: 19 }}
            lg={{ offset: 21 }}
            style={{ marginTop: '5px' }}
          >
            <Select
              defaultValue={`${languagesText[this.state.languageId].name}`}
              style={{ width: 120 }}
              onChange={this.onChangeLanguage.bind(this)}
            >
              {languages.map((language, index) => (
                <Select.Option
                  key={`lang-${index}`}
                  style={{ textAlign: 'center' }}
                  value={language.id}
                >
                  {language.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Layout.Content style={{ padding: '30px', paddingTop: '20px' }}>
          <div className="box-generated-password">
            <Row>
              <Col md={{ span: 21 }} sm={{ span: 20 }} xs={{ span: 16 }}>
                <Form>
                  <Input
                    aria-required="true"
                    id="password-is-generated"
                    value={this.state.password}
                    onKeyDown={this.onKeyDown.bind(this)}
                  />
                </Form>
              </Col>

              <Col
                md={{ span: 3 }}
                sm={{ span: 4 }}
                xs={{ span: 8 }}
                style={{ textAlign: 'center' }}
              >
                <div className="wrapper-icon-generated">
                  <Tooltip placement="bottom" title={'Copied!'} trigger="click">
                    <CopyOutlined
                      onClick={this.onCopy}
                      style={{ marginLeft: '10px' }}
                    />
                  </Tooltip>
                  <Tooltip placement="bottom" title={''} trigger="click">
                    <SyncOutlined
                      id="icon-gen"
                      onClick={this.onGeneratePassword.bind(this)}
                      style={{ marginLeft: '10px' }}
                    />
                  </Tooltip>
                </div>
              </Col>
            </Row>
            <Progress
              strokeWidth={10}
              strokeColor={strokeColor}
              trailColor={trailColor}
              percent={(this.state.passwordLength / 60) * 100}
              showInfo={false}
              status={statusProgress}
            />
          </div>

          <div className="setting">
            <Row style={rowStyle}>
              <Col xs={{ span: 10 }} className="text-label">
                {languagesText[this.state.languageId || 'en'].passwordLength}
              </Col>
              <Col xs={{ span: 8, offset: 2 }} sm={{ span: 9, offset: 1 }}>
                <Slider
                  value={this.state.passwordLength}
                  min={6}
                  max={60}
                  style={{ color: red[8] }}
                  onChange={this.onChangePasswordLength.bind(this)}
                />
              </Col>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 3, offset: 1 }}
                md={{ span: 2, offset: 1 }}
              >
                <Input
                  id="input-length"
                  aria-required="true"
                  type="text"
                  value={
                    this.state.inputPasswordLength !== 'none'
                      ? this.state.inputPasswordLength
                      : this.state.passwordLength
                  }
                  onBlur={this.onInputBlur.bind(this)}
                  onChange={this.onInputChange.bind(this)}
                  onKeyDown={this.onInputKeyDown.bind(this)}
                />
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className="text-label" xs={{ span: 10 }}>
                {languagesText[this.state.languageId || 'en'].includeSymbols}
              </Col>
              <Col xs={{ span: 10, offset: 2 }} sm={{ span: 9, offset: 1 }}>
                <Checkbox
                  onChange={this.onChangeIncludeSymbols.bind(this)}
                  checked={this.state.includeSymbols}
                >
                  <span className="text-note" style={{ userSelect: 'none' }}>
                    (! @ # $ % *)
                  </span>
                </Checkbox>
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className="text-label" xs={{ span: 10 }}>
                {languagesText[this.state.languageId || 'en'].includeNumbers}
              </Col>
              <Col xs={{ span: 10, offset: 2 }} sm={{ span: 9, offset: 1 }}>
                <Checkbox
                  onChange={this.onChangeIncludeNumbers.bind(this)}
                  checked={this.state.includeNumbers}
                >
                  <span className="text-note" style={{ userSelect: 'none' }}>
                    (0 1 2 3 4 5 6 7 8 9)
                  </span>
                </Checkbox>
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className="text-label" xs={{ span: 10 }}>
                {
                  languagesText[this.state.languageId || 'en']
                    .includeLowercaseCharacters
                }
              </Col>
              <Col xs={{ span: 10, offset: 2 }} sm={{ span: 9, offset: 1 }}>
                <Checkbox
                  onChange={this.onChangeIncludeLowercaseCharacters.bind(this)}
                  checked={this.state.includeLowercaseCharacters}
                >
                  <span className="text-note" style={{ userSelect: 'none' }}>
                    (a b c d e f g h i k)
                  </span>
                </Checkbox>
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className="text-label" xs={{ span: 10 }}>
                {
                  languagesText[this.state.languageId || 'en']
                    .includeUppercaseCharacters
                }
              </Col>
              <Col xs={{ span: 10, offset: 2 }} sm={{ span: 9, offset: 1 }}>
                <Checkbox
                  onChange={this.onChangeIncludeUppercaseCharacters.bind(this)}
                  checked={this.state.includeUppercaseCharacters}
                >
                  <span className="text-note" style={{ userSelect: 'none' }}>
                    (A B C D E F G H I K)
                  </span>
                </Checkbox>
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className="text-label" xs={{ span: 10 }}>
                {
                  languagesText[this.state.languageId || 'en']
                    .excludeSimilarCharacters
                }
              </Col>
              <Col xs={{ span: 10, offset: 2 }} sm={{ span: 9, offset: 1 }}>
                <Checkbox
                  onChange={this.onChangeExcludeSimilarCharacters.bind(this)}
                  checked={this.state.excludeSimilarCharacters}
                >
                  <span className="text-note" style={{ userSelect: 'none' }}>
                    (i l 1 L o 0 O)
                  </span>
                </Checkbox>
              </Col>
            </Row>

            <Row style={rowStyle}>
              <Col className="text-label" xs={{ span: 10 }}>
                {
                  languagesText[this.state.languageId || 'en']
                    .excludeAmbiguousCharacters
                }
              </Col>
              <Col xs={{ span: 10, offset: 2 }} sm={{ span: 9, offset: 1 }}>
                <Checkbox
                  onChange={this.onChangeExcludeAmbiguousCharacters.bind(this)}
                  checked={this.state.excludeAmbiguousCharacters}
                >
                  <span className="text-note" style={{ userSelect: 'none' }}>
                    ({} [ ] ( ) / \ ' " ` ~ , ; : . &#60; &#62;)
                  </span>
                </Checkbox>
              </Col>
            </Row>
          </div>
        </Layout.Content>
        <Layout.Footer>
          {/* <GoogleAds
          client='ca-pub-9551612008461721'
          slot='4755789695'
          style={{ display: 'block' }}
          format='auto'
          responsive='true'
        /> */}
        </Layout.Footer>
      </Layout>
    ) : (
      <></>
    );
  }
}

export default LayoutComponent;
