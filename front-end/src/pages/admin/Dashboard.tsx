import { Breadcrumb, Col, Layout, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { Line, G2, Column } from '@ant-design/plots';

import { each, findIndex } from '@antv/util';
import { list } from '../../api/contract';
import { ContractType } from '../types/contract';
import moment from 'moment';

type Props = {}

const Dashboard = (props: Props) => {
    const { InteractionAction, registerInteraction, registerAction } = G2;
    const [products, setProducts] = useState<any>();

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await list();
            setProducts(data);
        }
        getProducts();
    }, [])

    const get12Month = [...Array.from(Array(12).keys())].map(index => {
        const date = new Date();
        date.setMonth(date.getMonth() - (index));

        return date;
    });
    const Month12 = get12Month.map((item) => moment(item).format("MM/YYYY"))
    Month12.reverse()

    const data1 = [
        {
            month: '1',
            value: 3,
        },
    ];
    console.log(products);

    const data = Month12?.map((product, index) => {
        return {
            year: product,
            value: products?.filter((pay: any) => { return moment(pay.createdAt).format("MM/YYYY") === product }).length
        }
    })
    G2.registerShape('point', 'custom-point', {
        draw(cfg, container) {
            const point = {
                x: cfg.x,
                y: cfg.y,
            };
            const group = container.addGroup();
            group.addShape('circle', {
                name: 'outer-point',
                attrs: {
                    x: point.x,
                    y: point.y,
                    fill: cfg.color || 'red',
                    opacity: 0.5,
                    r: 6,
                },
            });
            group.addShape('circle', {
                name: 'inner-point',
                attrs: {
                    x: point.x,
                    y: point.y,
                    fill: cfg.color || 'red',
                    opacity: 1,
                    r: 2,
                },
            });
            return group;
        },
    });

    class CustomMarkerAction extends InteractionAction {
        active() {
            const view = this.getView();
            const evt = this.context.event;

            if (evt.data) {
                // items: 数组对象，当前 tooltip 显示的每条内容
                const { items } = evt.data;
                const pointGeometries = view.geometries.filter((geom) => geom.type === 'point');
                each(pointGeometries, (pointGeometry) => {
                    each(pointGeometry.elements, (pointElement, idx) => {
                        const active = findIndex(items, (item) => item.data === pointElement.data) !== -1;
                        const [point0, point1] = pointElement.shape.getChildren();

                        if (active) {
                            // outer-circle
                            point0.animate(
                                {
                                    r: 10,
                                    opacity: 0.2,
                                },
                                {
                                    duration: 1800,
                                    easing: 'easeLinear',
                                    repeat: true,
                                },
                            ); // inner-circle

                            point1.animate(
                                {
                                    r: 6,
                                    opacity: 0.4,
                                },
                                {
                                    duration: 800,
                                    easing: 'easeLinear',
                                    repeat: true,
                                },
                            );
                        } else {
                            this.resetElementState(pointElement);
                        }
                    });
                });
            }
        }

        reset() {
            const view = this.getView();
            const points = view.geometries.filter((geom) => geom.type === 'point');
            each(points, (point) => {
                each(point.elements, (pointElement) => {
                    this.resetElementState(pointElement);
                });
            });
        }

        resetElementState(element) {
            const [point0, point1] = element.shape.getChildren();
            point0.stopAnimate();
            point1.stopAnimate();
            const { r, opacity } = point0.get('attrs');
            point0.attr({
                r,
                opacity,
            });
            const { r: r1, opacity: opacity1 } = point1.get('attrs');
            point1.attr({
                r: r1,
                opacity: opacity1,
            });
        }

        getView() {
            return this.context.view;
        }
    }

    registerAction('custom-marker-action', CustomMarkerAction);
    registerInteraction('custom-marker-interaction', {
        start: [
            {
                trigger: 'tooltip:show',
                action: 'custom-marker-action:active',
            },
        ],
        end: [
            {
                trigger: 'tooltip:hide',
                action: 'custom-marker-action:reset',
            },
        ],
    });

    const dataCollum = [
        {
            name: 'Income',
            Month: 'Jan.',
            Value: 18.9,
        },
        {
            name: 'Income',
            Month: 'Feb.',
            Value: 28.8,
        },
        {
            name: 'Income',
            Month: 'Mar.',
            Value: 39.3,
        },
        {
            name: 'Income',
            Month: 'Apr.',
            Value: 81.4,
        },
        {
            name: 'Income',
            Month: 'May.',
            Value: 47,
        },
        {
            name: 'Income',
            Month: 'Jun.',
            Value: 20.3,
        },
        {
            name: 'Income',
            Month: 'Jul.',
            Value: 24,
        },
        {
            name: 'Income',
            Month: 'Aug.',
            Value: 35.6,
        },
        {
            name: 'Income',
            Month: 'Sep.',
            Value: 35.6,
        },
        {
            name: 'Income',
            Month: 'Oct.',
            Value: 35.6,
        },
        {
            name: 'Income',
            Month: 'Nov.',
            Value: 35.6,
        },
        {
            name: 'Income',
            Month: 'Dec.',
            Value: 35.6,
        },
        {
            name: 'Expenture',
            Month: 'Jan.',
            Value: 12.4,
        },
        {
            name: 'Expenture',
            Month: 'Feb.',
            Value: 23.2,
        },
        {
            name: 'Expenture',
            Month: 'Mar.',
            Value: 34.5,
        },
        {
            name: 'Expenture',
            Month: 'Apr.',
            Value: 99.7,
        },
        {
            name: 'Expenture',
            Month: 'May.',
            Value: 52.6,
        },
        {
            name: 'Expenture',
            Month: 'Jun.',
            Value: 35.5,
        },
        {
            name: 'Expenture',
            Month: 'Jul.',
            Value: 34.4,
        },
        {
            name: 'Expenture',
            Month: 'Aug.',
            Value: 125,
        },
        {
            name: 'Expenture',
            Month: 'Sep.',
            Value: 99.6,
        },
        {
            name: 'Expenture',
            Month: 'Oct.',
            Value: 49.6,
        },
        {
            name: 'Expenture',
            Month: 'Nov.',
            Value: 68.6,
        },
        {
            name: 'Expenture',
            Month: 'Dec.',
            Value: 80,
        },
    ];

    const dataCollum1 = [
        {
            Month: 'Jan',
            Value: 18.9,
        },
        {
            Month: 'Feb',
            Value: 28.8,
        },
        {
            Month: 'Mar',
            Value: 39.3,
        },
        {
            Month: 'Apr',
            Value: 81.4,
        },
        {
            Month: 'May',
            Value: 47,
        },
        {
            Month: 'Jun',
            Value: 20.3,
        },
        {
            Month: 'Jul',
            Value: 35.6,
        },
        {
            Month: 'Aug',
            Value: 34.5,
        },
        {
            Month: 'Sep',
            Value: 99.7,
        },
        {
            Month: 'Nov',
            Value: 70,
        },
        {
            Month: 'Dec',
            Value: 52.6,
        },
    ];

    const dataCollum2 = [
        {
            Month: 'Jan',
            Value: 18.9,
        },
        {
            Month: 'Feb',
            Value: 28.8,
        },
        {
            Month: 'Mar',
            Value: 39.3,
        },
        {
            Month: 'Apr',
            Value: 81.4,
        },
        {
            Month: 'May',
            Value: 47,
        },
        {
            Month: 'Jun',
            Value: 20.3,
        },
        {
            Month: 'Jul',
            Value: 35.6,
        },
        {
            Month: 'Aug',
            Value: 34.5,
        },
        {
            Month: 'Sep',
            Value: 99.7,
        },
        {
            Month: 'Nov',
            Value: 52.6,
        },
        {
            Month: 'Dec',
            Value: 120,
        },
    ];
    const configCollum = {
        dataCollum,
        isGroup: true,
        xField: 'Month',
        yField: 'Value',
        seriesField: 'name',

        /** 设置颜色 */
        //color: ['#1ca9e6', '#f88c24'],

        /** 设置间距 */
        // marginRatio: 0.1,
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'middle', 'bottom'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
    };

    const config = {
        dataCollum1,
        xField: 'Month',
        yField: 'Value',
        label: {},
        point: {
            size: 5,
            shape: 'custom-point',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'custom-marker-interaction',
            },
        ],
    };
    return (
        <div>
            <Layout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Dasboard</Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    className="site-layout-background"
                    style={{
                        margin: 0,
                        minHeight: 100,
                        backgroundColor: 'white'
                    }}>
                    <div style={{ minHeight: 300, }}>
                        <Row >
                            <Col span={12} style={{ paddingRight: '20px', textAlign: 'center' }}>
                                <div>
                                    <Line data={dataCollum1} {...config} />
                                </div>
                                <p>Number of Contract</p>
                            </Col>
                            <Col span={12} style={{ textAlign: 'center' }}>
                                <div>
                                    <Line data={dataCollum2} {...config} />
                                </div>
                                <p>Revenua</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Column data={dataCollum} {...configCollum} />
                                <p>Income And Expendture</p>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>

        </div>
    )
}

export default Dashboard