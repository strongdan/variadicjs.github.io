import React, {Component} from 'react';
import "./FuncCard.css";
import FuncCode from './FuncCode';
import FuncParams from './FuncParams';
import FuncResult from './FuncResult';
import {
  Card,
  CardActions,
  FlatButton,
  CardTitle,
  CardText,
} from 'material-ui';

class FuncCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: [],
      result: '',
      showCode: false,
      code: '',
    };

    this.handleToggleCode = this.handleToggleCode.bind(this);
    this.handleParamsChange = this.handleParamsChange.bind(this);
    this.handleRunCode = this.handleRunCode.bind(this);
  }

  fetchCode(func) {
    fetch(`https://raw.githubusercontent.com/variadicjs/variadic.js/develop/lib/${func}.js`).then((response) => {
      response.text().then((data) => {
        this.setState({code: data});
      });
    })
  }

  componentDidMount() {
    this.fetchCode(this.props.funcName);
  }

  handleParamsChange(params, e) {
    this.setState({params: params});
  }

  handleRunCode(e) {
    let funcName = this.props.funcName;
    let params = this.state.params;
    let result = this.props.func(...params);
    this.setState({result: result});
    this.props.onClickHandler(funcName);
  }

  handleToggleCode(e) {
    this.setState(prevState => ({showCode: !prevState.showCode}));
  }


  render() {
    const {
      funcName,
      subtitle,
    } = this.props;
    const {
      params,
      result,
      showCode,
      code
    } = this.state;

    return (
      <Card className="custom-card">
        <CardTitle title={funcName} subtitle={subtitle} />
        <FuncParams
            funcName={funcName}
            params={params}
            onParamsChange={this.handleParamsChange}
            onSubmit={this.handleParamSubmit}
          />

        <FuncResult
          funcName={funcName}
          params={params}
          result={result}
        />

        <CardActions>
          <FlatButton label="Run" onClick={this.handleRunCode}/>
          <FlatButton label={showCode ? 'Hide Code' : 'Show Code'} onClick={this.handleToggleCode}/>
        </CardActions>
        {(showCode && <CardText><FuncCode code={code}/></CardText>)}
      </Card>
    )
  }
}

export default FuncCard;
