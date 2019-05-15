import React, { Fragment } from 'react';
import { Header, Card, Container, Image, Segment, Button, Dimmer, Loader, Label } from 'semantic-ui-react';
import { RepositoryModel } from '../models/Repository.model';
import { searchRepositories } from '../api/github/repos.api';
import { UIlangs, ProgramLangs, getHeader } from '../constants/lang'
import { formatDate } from '../utils.ts/formatDate'
import { rowsCount } from '../constants/ui'
import { LoadStatuses } from '../constants/loadStatus';
import './App.css';

interface ComponentProps { }

interface ComponentState {
  repositories: RepositoryModel[],
  lang: string,
  loading: boolean,
  loaded: boolean,
  error: boolean
}

export default class App extends React.PureComponent<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      repositories: [],
      lang: 'JavaScript',
      loading: true,
      loaded: false,
      error: false,
    }
  }

  async componentDidMount() {
    this.loadRepositories(this.state.lang)
  }

  async componentDidUpdate(prevProps: ComponentProps, prevState: ComponentState) {
    if (prevState.lang !== this.state.lang) {
      this.loadRepositories(this.state.lang)
    }
  }

  loadRepositories = async (lang: string) => {
    try {
      this.setState(() => (LoadStatuses.LOADING))

      const repositories = await searchRepositories(this.state.lang);
      const reps = repositories.items.map((rep: RepositoryModel) => new RepositoryModel(rep))

      this.setState(Object.assign({ repositories: reps }, LoadStatuses.LOADED))
    } catch (error) {
      this.setState(() => (LoadStatuses.ERROR))
    }
  }

  changeLang = (lang: string) => {
    this.setState({ lang })
  }

  getHeaderButtons = (langs: string[]) => {
    const { lang } = this.state;
    return (
      <Fragment>
        {
          langs.map(progLang =>
            <Button key={progLang} active={lang === `${progLang}`} onClick={() => this.changeLang(progLang)}>
              {progLang}
            </Button>
          )
        }
      </Fragment>
    )
  }

  showLoader = (loading: boolean) => {
    if (loading) {
      return (
        <Dimmer active>
          <Loader>{UIlangs.loading}</Loader>
        </Dimmer>
      )
    }
    return null
  }

  showRepositories = (repositories: RepositoryModel[]) => {
    if (!repositories.length) return null
    return (
      <Segment size='tiny'>
        <Card.Group itemsPerRow={rowsCount}>
          {
            repositories.map(rep => (
              <Card key={`${rep.owner.id}-${rep.name}`}>
                <Image src={rep.owner.avatar_url} wrapped ui={false} as='a'
                  size='tiny'
                  href={rep.owner.html_url}
                  target='_blank' />
                <Card.Content>
                  <Card.Header as='a' href={rep.owner.html_url} target='_blank'>{rep.owner.login}</Card.Header>
                  <Card.Meta>{UIlangs.Language} {rep.language}</Card.Meta>
                  <Card.Meta>{UIlangs.Created}{formatDate(rep.created_at)}</Card.Meta>
                  <Card.Description as='a' href={rep.html_url} target='_blank'>{UIlangs.RepositoryName} {rep.name}</Card.Description>
                </Card.Content>
              </Card>

            ))
          }
        </Card.Group>
      </Segment>
    )
  }

  render() {
    const { repositories, lang, loading, error } = this.state;
    return (
      <div className="App">
        <Container>
          <Header as='h1'>{getHeader(lang)}</Header>
          {
            this.getHeaderButtons(ProgramLangs)
          }
          {
            this.showLoader(loading)
          }
          {
            this.showRepositories(repositories)
          }
          {
            error && <Label>{error}</Label>
          }

        </Container>

      </div>
    );
  }
}
