document.getElementById('se-todaysLeft').innerHTML=`<defs>
        <circle id="path-1" cx="142.5" cy="142.5" r="122.5"></circle>
        <filter x="-9.2%" y="-9.2%" width="118.4%" height="118.4%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="7.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
        <path d="M9,18 L270,18 L270,180.718889 L270,264 L9,264 L9,18 Z M164.573523,20.4419493 L142.200969,79.059646 L117.138829,21.5431844 L118.873727,84.2711274 L73.7358189,40.7355483 L99.3140269,98.0238827 L40.9722023,75.0971066 L86.4994969,118.224288 L23.8357895,119.396768 L82.3812018,141.796944 L24.9356666,166.890029 L87.5864364,165.153168 L44.1043634,210.346807 L101.322053,184.737018 L78.4235489,243.150696 L121.497548,197.56719 L122.668402,260.308266 L145.041136,201.69057 L170.103277,259.207031 L168.368558,196.478908 L213.506466,240.014667 L187.928258,182.726153 L246.270083,205.653109 L200.742608,162.525928 L263.406316,161.353628 L263.406316,161.353448 L204.860903,138.953451 L262.306439,113.860187 L199.655849,115.597048 L243.137742,70.403409 L185.920052,96.0131976 L208.818556,37.59934 L165.744557,83.1828459 L164.573523,20.4419493 Z" id="path-3"></path>
        <filter x="-2.7%" y="-2.0%" width="105.4%" height="105.7%" filterUnits="objectBoundingBox" id="filter-4">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
    </defs>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-70.000000, -5395.000000)">
            <g transform="translate(70.000000, 5395.000000)">
                <g>
                    <rect id="whitebg" fill="#FC0000" x="9" y="18" width="261" height="246" rx="2"></rect>
                    <g id="thesun">
                        <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
                        <use fill="#70FF73" fill-rule="evenodd" xlink:href="#path-1"></use>
                    </g>
                    <g id="star">
                        <use fill="black" fill-opacity="1" filter="url(#filter-4)" xlink:href="#path-3"></use>
                        <use fill="#48C7FF" fill-rule="evenodd" xlink:href="#path-3"></use>
                    </g>
                    <path d="M10.1273521,267.745358 L2,267.745358 C0.8954305,267.745358 1.3527075e-16,266.849927 0,265.745358 L0,13.7289626 C-1.3527075e-16,12.6243931 0.8954305,11.7289626 2,11.7289626 L10.1273521,11.7289626 L10.1273521,2 C10.1273521,0.8954305 11.0227826,1.48858703e-12 12.1273521,1.48858703e-12 L266.452987,1.50279789e-12 C267.557556,1.50279789e-12 268.452987,0.8954305 268.452987,2 L268.452987,16.3216594 C268.452987,17.4262289 267.557556,18.3216594 266.452987,18.3216594 L12.8696625,18.3216594 L12.8696625,260.249701 L266.452987,260.249701 C267.557556,260.249701 268.452987,261.145131 268.452987,262.249701 L268.452987,282 C268.452987,283.104569 267.557556,284 266.452987,284 L12.1273521,284 C11.0227826,284 10.1273521,283.104569 10.1273521,282 L10.1273521,267.745358 Z M271.130338,11.7289626 L280,11.7289626 C281.104569,11.7289626 282,12.6243931 282,13.7289626 L282,265.745358 C282,266.849927 281.104569,267.745358 280,267.745358 L271.130338,267.745358 C270.025768,267.745358 269.130338,266.849927 269.130338,265.745358 L269.130338,13.7289626 C269.130338,12.6243931 270.025768,11.7289626 271.130338,11.7289626 Z" id="frame" fill="#48C7FF"></path>
                </g>
                <text font-family="GetVoIPGrotesque, GetVoIP Grotesque" font-size="20" font-weight="bold" fill="#000000">
                    <tspan id="todays-left-value" x="102.07" y="147">20 ìèí</tspan>
                </text>
            </g>
        </g>
    </g>`;





