var traces = [

];
        const layout = {
            xaxis: { title: 'Time (s)' },
            yaxis: { title: 'y [varying]' }
        };
        updatemenus: [{
                buttons: [
                    {
                        label: 'Line',
                        method: 'update',
                        args: [{'mode': 'lines'}, {'title': 'Lines Mode'}]  // Update mode to lines
                    },
                    {
                        label: 'Scatter',
                        method: 'update',
                        args: [{'mode': 'markers'}, {'title': 'Scatter Mode'}]  // Update mode to scatter
                    }
                ],
                direction: 'down',
                showactive: true,
            }],
        