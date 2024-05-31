import { Col, Divider, Image, Row, Typography } from "antd"
import authorImg from "./author.png"
import authorImgLighten from "./author_lighten.png"
import { GithubOutlined } from "@ant-design/icons"
import { Theme } from "../main/themes"
const { Link } = Typography

function About(props: { theme: Theme }) {
    const {theme} = props
    const auImg = theme.isDark ? authorImgLighten : authorImg

    return (
        <div id="about">
            <Typography 
                className="title"
            >
                SpellCast Solver <Link
                    style={{ color: theme.isDark ? "white" : "black", fontSize: 20 }}
                    target="_blank" 
                    href="https://github.com/parad8816/spellcast-solver"
                >
                    <GithubOutlined />
                </Link>
            </Typography>
            <Typography className="info">Version 1.0.1</Typography>
            <Typography className="info">by Tonal1ty</Typography>
            <Row align={"stretch"} justify={"space-between"} style={{ marginTop: 16 }}>
                <Col flex={"320px"}>
                    <Typography className="text">
                        SpellCast (Discord) の最高点を求めるアプリです。
                    </Typography>
                    <Typography className="text">
                        Double Letterなどのポイント増加要素を加味した上での最高点の単語と、それを得るための経路を知ることができます。
                    </Typography>
                    <Typography className="text">
                        必要に応じてSwap可能回数を指定し、さらに高得点を狙うことができますが、
                        これが多いほど所要時間が顕著に長くなるのでご注意ください。
                    </Typography>
                    <Typography className="text" style={{ marginTop: 12 }}>
                        お友達との対戦では使わないようにしましょう！
                        本アプリの使用によって生じたいかなる人間関係への亀裂も、私は一切責任を負いかねますことをご承知おきください。
                    </Typography>
                    <Divider style={{ background: "#bbbbbb", marginTop: 10, marginBottom: 10 }} />
                    <Typography className="text">
                        このアプリは <Link 
                            className="text" 
                            target="_blank"
                            href="https://github.com/electron-react-boilerplate/electron-react-boilerplate"
                        >
                            Electron React Boilerplate
                        </Link> によって作成されました。
                    </Typography>
                    <Typography className="text">
                        Copyright (c) 2015-present Electron React Boilerplate
                    </Typography>
                    <Typography className="text">
                        Released under the <Link
                            className="text" 
                            target="_blank"
                            href="https://github.com/electron-react-boilerplate/electron-react-boilerplate/blob/main/LICENSE"
                        >
                            MIT License
                        </Link>
                    </Typography>
                </Col>
                <Col flex={"200px"} className="author-container">
                    <Image 
                        width={150} 
                        src={auImg} 
                        preview={false} 
                        style={{ marginTop: 16 }} 
                    />
                    <Typography className="text" style={{ marginTop: 10 }}>作者の図</Typography>
                </Col>
            </Row>
        </div>
    )
}

export default About
