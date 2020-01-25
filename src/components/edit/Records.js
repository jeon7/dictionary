import React, { Component } from 'react';
import db from '../../db';
import RecordsTemplate from './RecordsTemplate';
import RecordAdd from './RecordAdd';
import RecordList from './RecordList';


class Records extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
    };
    this.handleRecordAdd = this.handleRecordAdd.bind(this);
    this.handleRecordUpdate = this.handleRecordUpdate.bind(this);
    this.handleRecordDelete = this.handleRecordDelete.bind(this);
  }

  componentDidMount() {
    db.table('records')
      .toArray()
      .then((records) => {
        this.setState({ records });
      });
  }

  handleRecordAdd(dictionary_title, domain, range) {
    const record = {
      dictionary_title,
      domain,
      range,
    };

    db.open().catch(function (e) {
      console.error("Open failed: " + e.stack);
    })

    db.table('records')
      .add(record)
      .then((id) => {
        const newList = [...this.state.records, Object.assign({}, record, { id })];
        this.setState({ records: newList });
      });
  }

  handleRecordUpdate(id, domain, range) {
    window.confirm('update');
    db.table('records')
      .update(id, { domain, range })
      .then(() => {
        const recordToUpdate = this.state.records.find((record) => record.id === id);
        // TODO sort by id 
        const newList = [
          ...this.state.records.filter((record) => record.id !== id),
          Object.assign({}, recordToUpdate, { domain, range })
        ];
        this.setState({ records: newList });
      })
  }

  handleRecordDelete(id) {
    db.table('records')
      .delete(id)
      .then(() => {
        const newList = this.state.records.filter((record) => record.id !== id);
        this.setState({ records: newList });
      });
  }

  checkDuplicates(newDomain, newRange) {
    // records in same dictionary
    const selected_records = this.props.records.filter((record) =>
      record.dictionary_title === this.props.selected_dictionary_title);

    // records with same domain
    const records_same_domain = selected_records.filter((record) =>
      newDomain === record.domain);

    // duplicates: records with same domain and same range
    const records_duplicates = records_same_domain.filter((record) =>
      newRange === record.range);

    //test
    console.info('JSON.stringify(records_duplicates): ' + JSON.stringify(records_duplicates));

    if (records_duplicates.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  checkForks(newDomain, newRange) {
    // records in same dictionary
    const selected_records = this.props.records.filter((record) =>
      record.dictionary_title === this.props.selected_dictionary_title);

    // records with same domain
    const records_same_domain = selected_records.filter((record) =>
      newDomain === record.domain);

    // forks: records with same domain and different range
    const records_forks = records_same_domain.filter((record) =>
      newRange !== record.range);

    //test
    console.info('JSON.stringify(records_forks): ' + JSON.stringify(records_forks));

    if (records_forks.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  checkCycles(newDomain, newRange) {
    return true;
  }

  checkChains(newDomain, newRange) {
    return true;
  }

  render() {
    let selected_dictionary_title = this.props.match.params.dictionary_title;

    return (
      <>
        <RecordsTemplate selected_dictionary_title={selected_dictionary_title}>
          <RecordAdd
            records={this.state.records}
            selected_dictionary_title={selected_dictionary_title}
            handleRecordAdd={this.handleRecordAdd}
            checkDuplicates={this.checkDuplicates}
            checkForks={this.checkForks}
            checkCycles={this.checkCycles}
            checkChains={this.checkChains}
          />
          <RecordList
            records={this.state.records}
            selected_dictionary_title={selected_dictionary_title}
            handleRecordUpdate={this.handleRecordUpdate}
            handleRecordDelete={this.handleRecordDelete}
          />
        </RecordsTemplate>

      </>
    );
  }
}

export default Records;
