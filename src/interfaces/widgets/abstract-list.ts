import * as React from 'react';

export interface AbstractListProps {
  start?: number;
  amount?: number;
}

abstract class AbstractList extends React.Component<AbstractListProps> {

  public readonly state: any;

  public constructor(props: any) {
    super(props);
    this.setState({
      amount: this.props.amount ? this.props.amount : 5, 
      end: this.calcAmountOfNews(),
      start: this.props.start ? this.props.start : 0,
    })
  }

  public abstract request(start: number, end: number): void;


  public loadMore() {
    const newEnd = this.state.end + this.state.amount;
    this.request(this.state.end, newEnd)
    this.setState({
      end: newEnd,
      start: this.state.end
    });
  }

  protected calcAmountOfNews() {
    if (this.props.start && this.props.amount) { 
      return this.props.start + this.props.amount
    } else if (this.props.start === undefined && this.props.amount !== undefined) {
      return this.props.amount
    } else if (this.props.start !== undefined && this.props.amount === undefined) {
      return this.props.start + 5
    }
    return 5; // функция написана так из-за неадекватной прихоти `typescript`
  }   
}

export default AbstractList;