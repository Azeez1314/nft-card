
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { Row, Card, Button, Container } from "react-bootstrap";
import Link from "next/link";

const WalletNfts = () => {

    const route = useRouter();
    const {wallet} = route.query;
    const [nfts, setNfts] = useState(null)

const FetchNfts = () => {
    fetch(`https://api.opensea.io/api/vl/assets?owner=${wallet}`)
        .then((response) => response.json)
        .then((data) => {
            setNfts(data.asset);
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
}

useEffect(() => {
    FetchNfts();
}, [wallet])

    return (
        <>
            {nfts ? (
                <Container>
                    <Row>
                        {nfts.map((nft, index) => (
                            <Col key={index} lg={4} md={6} sm={12}>
                                <Card className="mb-2 card-hover">
                                <Card.Img variant="top" src={nft.image_url} />
                                <Card.Body>
                                    <Card.Title>{nft.name}</Card.Title>
                                    <Card.Text className="text-truncate">
                                        {nft.description}
                                    </Card.Text>
                                    <Link legacyBehavior href={nft.permalink}>
                                        <a className="btn btn-primary text-decoration-none">Get Details</a>
                                    </Link>
                                </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            ): null}
        </>

    )
}

export default WalletNfts;