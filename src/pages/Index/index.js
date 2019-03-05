import React, {useState, useEffect} from 'react';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import Editor from '../../components/Editor';

import './index.scss';
const shareVk = () => {
    const title = 'title';
    const desc = 'Участвуйте в празднике футбола Mi 2018 и выигрывайте призы!';

    // const img = 'http://47.101.151.108/static/share1.jpg';
    let url = `http://47.101.151.108`;
    const img = 'http://47.101.151.108/static/' + myRef.current.value;
    window.open(`https://vk.com/share.php?url=${url}&title=${title}&description=${desc}&image=${img}`);   
}

function Index() {
    const list = useInitialList();
    const [html, setHtml] = useState(null);

    return(
        <main className="main">
            <TextField
                id="outlined-name"
                margin="normal"
                variant="outlined"
                placeholder="发现"
                fullWidth
            />
            <div className="wrapper">
                {renderList(list)}
            </div>
            <Editor onChange={html => setHtml(html)}/>
            <div  dangerouslySetInnerHTML={{__html: html}}></div>
            <img src ='./share.jpg' />
            <button onClick={shareVk}>click</button>
            
        </main>
    )
}

function useInitialList() {
    const [list, setList] = useState([]);


    useEffect(() => {
        axios.get('http://47.101.151.108:9000/api/v1')
        .then(res => {
            setList(res.data.data && res.data.data.entries || [])
        });
    }, []);

    return list;
}

const myRef = React.createRef();

function renderList(list) {
    
    if(!list.length) {
        return (
            <div className="flex-box">
                <input ref={myRef}/>
            </div>
        );
    }

    return list.map(d => {
        return(
            <Card  className="list-container">
                <CardActionArea>
                    <CardMedia
                        className="list-image"
                        component="img"
                        image={d.images.small}
                        title="Contemplative Reptile"
                        />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {d.title}
                    </Typography>
                    <Typography component="p">
                        {d.rating}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
                
            </Card>
        )   
    })
}

export default Index;
