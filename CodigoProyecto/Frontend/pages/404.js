import React from 'react';
import {motion, } from 'framer-motion'
import Header from '../components/utils/Header'
import Footer  from '../components/utils/Footer'
const _404 = () => {
    return (
        <div className="overflow-x-hidden">
            <Header forceBackground={true}/>
            <div className="w-4/5 mx-auto p-4 m-4 flex flex-col justify-center items-center mt-32">
                <h1 className="text-center text-xl sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl font-extrabold text-gray-800 my-4"> No hemos encontrado lo que buscas!</h1>
                <svg viewBox="0 0 1073 891" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11/12 lg:w-8/12 xl:w-8/12">
                    <g id="Man in collector">
                        <path id="Path 519" fill-rule="evenodd" clip-rule="evenodd" d="M987 643.5L1021.31 544.604C1031.49 515.253 1023.77 482.66 1001.5 461L1000.53 460.059C978.144 438.284 967.215 407.298 970.987 376.295L983.857 270.523C990.527 215.699 951.491 165.848 896.667 159.177C893.873 158.837 891.066 158.616 888.253 158.512L847 157L762.817 76.6434C734.131 49.2609 691.345 42.8273 655.874 60.5627L560.549 108.225C545.113 115.943 527.942 119.535 510.706 118.651L433.331 114.683C392.051 112.567 355.439 140.984 347.25 181.5L334.28 245.666C333.428 249.884 332.848 254.153 332.546 258.446L320.382 430.984C319.799 439.254 317.664 447.34 314.087 454.819L280.638 524.757C270.231 546.516 268.04 571.303 274.467 594.55L288 643.5H987Z" fill="#C4C4DE"/>
                        <path id="Path 488" fill-rule="evenodd" clip-rule="evenodd" d="M288 643.5L198.288 740.881C171.72 769.721 173.561 814.638 202.401 841.206C214.694 852.531 230.589 859.156 247.287 859.914L912.78 890.13C951.952 891.909 985.149 861.595 986.927 822.424C986.976 821.351 987 820.277 987 819.203V643.5H288Z" fill="#8B8BB5"/>
                        <g id="Combined Shape">
                            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="423" y="0" width="650" height="409">
                                <g id="mask 2">
                                    <path id="Vector" d="M450.5 322.5V0.5H423.5V336C423.5 343.456 429.544 349.5 437 349.5H657.221C672.943 349.5 688.367 353.785 701.836 361.894L752.238 392.238C769.911 402.878 790.15 408.5 810.779 408.5H1072.5V381.5H810.779C795.057 381.5 779.633 377.215 766.164 369.106L715.762 338.762C698.089 328.122 677.85 322.5 657.221 322.5H450.5Z" fill="white"/>
                                </g>
                            </mask>
                            <g mask="url(#mask0)">
                                <path id="Mask" d="M450.5 322.5V0.5H423.5V336C423.5 343.456 429.544 349.5 437 349.5H657.221C672.943 349.5 688.367 353.785 701.836 361.894L752.238 392.238C769.911 402.878 790.15 408.5 810.779 408.5H1072.5V381.5H810.779C795.057 381.5 779.633 377.215 766.164 369.106L715.762 338.762C698.089 328.122 677.85 322.5 657.221 322.5H450.5Z" fill="#FF8484"/>
                                <path id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M954 373.5H1098V422.5H954V373.5ZM393 314.5H537V363.5H393V314.5ZM415.5 198V75.5H476L464.5 198H415.5ZM702.5 304.5L818.5 359.5V408.5C815.17 421.226 801.504 426.56 777.5 424.5C753.496 422.44 716.663 412.774 667 395.5L702.5 304.5Z" fill="#DE6262"/>
                            </g>
                        </g>
                        <motion.path initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2,yoyo: Infinity,}} id="Lampara" fill-rule="evenodd" clip-rule="evenodd" d="M591 409.5L259 91L230 501.5L584.5 438.5L591 409.5Z" fill="#FFEECD"/>
                        <motion.g initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2,yoyo: Infinity,}} id="Luz">
                            <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="65" y="74" width="288" height="418">
                                <g id="mask 4">
                                    <path id="Vector_3" d="M126.707 486.44C191.961 512.773 281.704 443.037 327.153 330.68C372.603 218.323 356.547 105.893 291.293 79.5597C226.039 53.2265 136.296 122.963 90.8466 235.32C45.3975 347.677 61.4527 460.107 126.707 486.44Z" fill="white"/>
                                </g>
                            </mask>
                            <g mask="url(#mask1)">
                                <path id="Mask_2" d="M228.036 501.627C298.133 495.465 346.435 392.587 335.922 271.843C325.408 151.099 260.061 58.2113 189.964 64.3731C119.867 70.535 71.5646 173.413 82.0781 294.157C92.5917 414.901 157.939 507.789 228.036 501.627Z" fill="#F5CB76"/>
                                <g id="Group">
                                    <g id="Group_2">
                                        <path id="Combined Shape_2" d="M346 425V443H238V425H187V405H292H399V425H346ZM344 425H292H240V441H344V425ZM238 423H292V407H189V423H238ZM294 423H346H397V407H294V423ZM214 140H161V156H264V140H214ZM214 138H266V158H161H53V138H107V120H214V138ZM159 156V140H107H55V156H159ZM212 138V122H109V138H159H212ZM105 185H212V205H105H0V185H105ZM105 203V187H2V203H105ZM107 203H210V187H107V203Z" fill="white"/>
                                        <path id="Rectangle Copy 9" d="M398 471H293V489H398V471Z" stroke="white" stroke-width="2"/>
                                        <path id="Rectangle Copy 12" d="M451 425H346V443H451V425Z" stroke="white" stroke-width="2"/>
                                    </g>
                                </g>
                            </g>
                        </motion.g>
                        <path id="Path 478 Copy 2" fill-rule="evenodd" clip-rule="evenodd" d="M571.966 450.5C554.678 479.347 554.678 496.065 571.966 500.655C589.253 505.244 603.931 491.148 616 458.367L571.966 450.5Z" fill="#353535"/>
                        <path id="Oval" d="M592.5 803.5C709.861 803.5 805 791.859 805 777.5C805 763.141 709.861 751.5 592.5 751.5C475.139 751.5 380 763.141 380 777.5C380 791.859 475.139 803.5 592.5 803.5Z" fill="#353535"/>
                        <g id="Path 480">
                            <mask id="mask2" mask-type="alpha" maskUnits="userSpaceOnUse" x="239" y="424" width="684" height="419">
                                <g id="mask 6">
                                    <path id="Vector_4" d="M849.394 765.285L872.353 781.509C872.513 781.623 872.668 781.743 872.817 781.871C875.458 784.134 875.763 788.11 873.5 790.75C870.787 793.915 866.385 795.047 862.482 793.584C836.503 783.846 821.509 776.818 817.5 772.5L756 719L678 699.5L673 801.5C666.662 802.056 661.828 802.389 658.5 802.5C628.5 803.5 604.169 803.867 588.222 804.114C572.228 804.362 553.431 804.114 526.186 803.276C523.648 803.198 518.478 802.639 510.677 801.6L521.156 692.241L456.724 757.658C451.59 762.87 445.9 767.503 439.756 771.474L381.243 809.288C374.537 813.622 367.08 816.662 359.257 818.253L240 842.5C238.254 828.286 244.087 815.453 257.5 804C269.206 794.005 308.198 787.229 336 785.5C338.657 785.335 361.562 766.498 404.713 728.989C406.234 727.667 407.661 726.243 408.987 724.725L482.649 640.388C500.422 620.038 525.809 607.929 552.809 606.923L591 605.5L599.539 566.96H578.741C563.277 566.96 550.741 554.424 550.741 538.96C550.741 535.883 551.249 532.827 552.242 529.916L572.972 469.181C582.092 442.46 607.199 424.5 635.434 424.5H649.419C673.16 424.5 692.405 443.746 692.405 467.486C692.405 472.458 691.543 477.392 689.856 482.069L643 612L769.748 658.391C786.92 664.677 802.04 675.55 813.464 689.829L848 733C878 731.667 894.333 733.333 897 738C899.215 741.875 907.061 750.463 920.54 763.764C923.216 766.404 923.244 770.714 920.604 773.39C919.687 774.318 918.523 774.964 917.25 775.25C909.511 776.987 901.402 775.098 895.227 770.119L889.5 765.5C868.971 766.619 855.971 766.619 850.5 765.5C850.13 765.424 849.761 765.353 849.394 765.285Z" fill="white"/>
                                </g>
                            </mask>
                            <g mask="url(#mask2)">
                                <path id="Mask_3" d="M849.394 765.285L872.353 781.509C872.513 781.623 872.668 781.743 872.817 781.871C875.458 784.134 875.763 788.11 873.5 790.75C870.787 793.915 866.385 795.047 862.482 793.584C836.503 783.846 821.509 776.818 817.5 772.5L756 719L678 699.5L673 801.5C666.662 802.056 661.828 802.389 658.5 802.5C628.5 803.5 604.169 803.867 588.222 804.114C572.228 804.362 553.431 804.114 526.186 803.276C523.648 803.198 518.478 802.639 510.677 801.6L521.156 692.241L456.724 757.658C451.59 762.87 445.9 767.503 439.756 771.474L381.243 809.288C374.537 813.622 367.08 816.662 359.257 818.253L240 842.5C238.254 828.286 244.087 815.453 257.5 804C269.206 794.005 308.198 787.229 336 785.5C338.657 785.335 361.562 766.498 404.713 728.989C406.234 727.667 407.661 726.243 408.987 724.725L482.649 640.388C500.422 620.038 525.809 607.929 552.809 606.923L591 605.5L599.539 566.96H578.741C563.277 566.96 550.741 554.424 550.741 538.96C550.741 535.883 551.249 532.827 552.242 529.916L572.972 469.181C582.092 442.46 607.199 424.5 635.434 424.5H649.419C673.16 424.5 692.405 443.746 692.405 467.486C692.405 472.458 691.543 477.392 689.856 482.069L643 612L769.748 658.391C786.92 664.677 802.04 675.55 813.464 689.829L848 733C878 731.667 894.333 733.333 897 738C899.215 741.875 907.061 750.463 920.54 763.764C923.216 766.404 923.244 770.714 920.604 773.39C919.687 774.318 918.523 774.964 917.25 775.25C909.511 776.987 901.402 775.098 895.227 770.119L889.5 765.5C868.971 766.619 855.971 766.619 850.5 765.5C850.13 765.424 849.761 765.353 849.394 765.285Z" fill="#FFCDCD"/>
                                <path id="Vector_5" fill-rule="evenodd" clip-rule="evenodd" d="M568 604C577 619.333 592 628 613 630C634 632 649.333 627 659 615L765 636.406L720.5 718L698 715L678.314 802.976L494.054 815.5L521.693 693.599L494.054 745.365L417 659.784C450.289 627.057 479.743 607.297 505.361 600.503C530.979 593.71 551.859 594.875 568 604Z" fill="#FFF9D6"/>
                            </g>
                        </g>
                        <path id="Combined Shape_3" fill-rule="evenodd" clip-rule="evenodd" d="M677.692 475.884L697.997 480.744C698.176 515.246 689.116 530.236 670.818 525.714C661.669 523.453 656.489 517.888 655.277 509.019C647.588 515.294 639.586 517.013 631.269 514.173C614.399 508.415 613.615 491.524 628.916 463.5L678 475.203C677.897 475.431 677.795 475.658 677.692 475.884V475.884Z" fill="#353535"/>
                        <g id="Path 483">
                            <mask id="mask3" mask-type="alpha" maskUnits="userSpaceOnUse" x="564" y="414" width="143" height="71">
                                <g id="mask 8">
                                    <path id="Vector_6" d="M564 448.467L707 484.5C701.072 478.913 698.238 474.649 698.498 471.707C701.447 438.355 682.945 427.817 644.962 419.571C606.796 411.285 595.15 410.351 578.879 438.645C577.503 441.038 572.544 444.312 564 448.467Z" fill="white"/>
                                </g>
                            </mask>
                            <g mask="url(#mask3)">
                                <path id="Mask_4" d="M564 448.467L707 484.5C701.072 478.913 698.238 474.649 698.498 471.707C701.447 438.355 682.945 427.817 644.962 419.571C606.796 411.285 595.15 410.351 578.879 438.645C577.503 441.038 572.544 444.312 564 448.467Z" fill="#3C3CA0"/>
                                <path id="Vector_7" fill-rule="evenodd" clip-rule="evenodd" d="M593 437.5L701.5 466.5L704.5 455L597 422.5L593 437.5Z" fill="#26266F"/>
                            </g>
                        </g>
                        <path id="Oval_2" d="M587.5 443.5C598.27 443.5 607 434.77 607 424C607 413.23 598.27 404.5 587.5 404.5C576.73 404.5 568 413.23 568 424C568 434.77 576.73 443.5 587.5 443.5Z" fill="#F5CB76"/>
                        <path id="Oval_3" d="M587.5 438.5C596.06 438.5 603 432.008 603 424C603 415.992 596.06 409.5 587.5 409.5C578.94 409.5 572 415.992 572 424C572 432.008 578.94 438.5 587.5 438.5Z" fill="#FFEECD"/>
                        <path id="Combined Shape_4" d="M581.331 474.376C579.213 469.369 576.145 467 572 467V464C577.174 464 581.105 466.842 583.685 472.294C593.72 466.314 602.147 468.496 608.287 478.728C608.713 479.439 608.483 480.36 607.772 480.786C607.062 481.212 606.14 480.982 605.714 480.272C600.217 471.11 593.272 469.581 584.116 475.561L563.373 510.657L575.534 513.028C576.347 513.186 576.877 513.974 576.719 514.787C576.56 515.6 575.773 516.131 574.96 515.972L560.713 513.195C559.696 512.997 559.182 511.852 559.709 510.96L581.331 474.376ZM593 488.5C590.791 488.5 589 486.709 589 484.5C589 482.291 590.791 480.5 593 480.5C595.21 480.5 597 482.291 597 484.5C597 486.709 595.21 488.5 593 488.5ZM572 482.5C569.791 482.5 568 480.709 568 478.5C568 476.291 569.791 474.5 572 474.5C574.21 474.5 576 476.291 576 478.5C576 480.709 574.21 482.5 572 482.5ZM565.641 533.166C561.089 531.924 558.232 528.156 559.259 524.751C560.286 521.346 564.808 519.592 569.36 520.834C573.911 522.076 576.769 525.844 575.742 529.249C574.715 532.654 570.193 534.408 565.641 533.166ZM554.093 546.481C554.379 545.704 555.242 545.306 556.019 545.592C556.796 545.879 557.194 546.741 556.908 547.519L553.408 557.019C553.122 557.796 552.259 558.194 551.482 557.908C550.705 557.621 550.306 556.759 550.593 555.981L554.093 546.481ZM560.093 548.481C560.379 547.704 561.242 547.306 562.019 547.592C562.796 547.879 563.194 548.741 562.908 549.519L559.408 559.019C559.122 559.796 558.259 560.194 557.482 559.908C556.705 559.621 556.306 558.759 556.593 557.981L560.093 548.481ZM566.093 550.481C566.379 549.704 567.242 549.306 568.019 549.592C568.796 549.879 569.194 550.741 568.908 551.519L565.408 561.019C565.122 561.796 564.259 562.194 563.482 561.908C562.705 561.621 562.306 560.759 562.593 559.981L566.093 550.481Z" fill="#353535"/>
                        <path id="Combined Shape_5" fill-rule="evenodd" clip-rule="evenodd" d="M732 156V176H627H519V156H539V136H644H751V156H732ZM644 197H751V217H644V197ZM401 561V580H293V561H240V541H345H452V561H401ZM973 307H1027V327H922H814V307H761V287H866H973V307ZM894 533.5H965V553.5H858V534.5H787V514.5H894V533.5Z" fill="#8B8BB5"/>
                        <path id="Rectangle Copy 8" d="M106 121H1V139H106V121Z" stroke="white" stroke-width="2"/>
                        <path id="404 copy" d="M176.468 302.028V311.452H167.788V318.52H156.628V311.452H126V302.028L156.628 275.12H167.788V302.028H176.468ZM138.028 302.028H156.628V286.28L138.028 302.028ZM204.802 319.14C187.566 319.14 179.382 311.204 179.382 296.758C179.382 282.374 187.566 274.5 204.802 274.5C221.976 274.5 230.222 282.436 230.222 296.758C230.222 311.142 221.976 319.14 204.802 319.14ZM204.802 309.778C214.598 309.778 219.062 304.88 219.062 296.758C219.062 288.698 214.598 283.862 204.802 283.862C195.006 283.862 190.542 288.636 190.542 296.758C190.542 304.942 195.006 309.778 204.802 309.778ZM284.348 302.028V311.452H275.668V318.52H264.508V311.452H233.88V302.028L264.508 275.12H275.668V302.028H284.348ZM245.908 302.028H264.508V286.28L245.908 302.028Z" fill="white"/>
                        <path id="Combined Shape_6" fill-rule="evenodd" clip-rule="evenodd" d="M643 337.5H652V357.5H643V337.5ZM869 395.5H878V415.5H869V395.5Z" fill="#8B8BB5"/>
                        <path id="Combined Shape_7" fill-rule="evenodd" clip-rule="evenodd" d="M741 785.5H579V804H564V742C564 737.858 567.358 734.5 571.5 734.5C575.642 734.5 579 737.858 579 742V770.5H741V742C741 737.858 744.358 734.5 748.5 734.5C752.642 734.5 756 737.858 756 742V794L741 796V785.5Z" fill="#FF8484"/>
                        <path id="Path 482" d="M287.126 818.546C280.522 820.527 276 826.605 276 833.5C276 834.328 276.672 835 277.5 835C278.328 835 279 834.328 279 833.5C279 827.93 282.653 823.02 287.988 821.42L302.931 816.937C303.38 816.802 303.74 816.466 303.904 816.027C304.499 814.442 308.655 811.725 316.116 808.368C323.036 805.254 326.911 804.737 331.574 805.333L332.21 805.415C332.459 805.447 332.65 805.47 332.834 805.491C333.658 805.582 334.399 804.989 334.491 804.166C334.582 803.342 333.989 802.601 333.166 802.509C333.002 802.491 332.826 802.469 332.593 802.439C332.521 802.43 332.086 802.374 331.954 802.357C326.757 801.693 322.324 802.284 314.884 805.632C307.349 809.023 302.935 811.772 301.449 814.249L287.126 818.546Z" fill="#353535"/>
                        <path id="Path 487" fill-rule="evenodd" clip-rule="evenodd" d="M648 523.159C668.279 528.425 680.074 524.492 683.385 511.359C685.896 501.4 680.639 493.183 669.107 495.969C666.657 496.561 661.955 501.071 655 509.5L648 523.159Z" fill="#FFCDCD"/>
                        <path id="Path 476" d="M865.709 749.986L880.953 747.846C888.968 746.721 897.082 749.057 903.272 754.27L921.534 769.648C922.168 770.181 923.114 770.1 923.647 769.467C924.181 768.833 924.1 767.887 923.466 767.353L905.205 751.975C898.363 746.213 889.394 743.632 880.536 744.875L865.292 747.015C864.471 747.13 863.9 747.888 864.015 748.709C864.13 749.529 864.888 750.101 865.709 749.986Z" fill="#353535"/>
                        <path id="Combined Shape_8" d="M626 157H539V155H645V136H647V155H732V157H628V176H626V157ZM921 308H814.5C813.948 308 813.5 307.552 813.5 307C813.5 306.448 813.948 306 814.5 306H867V287H869V306H973C973.552 306 974 306.448 974 307C974 307.552 973.552 308 973 308H923V327H921V308ZM858 535C857.448 535 857 534.552 857 534C857 533.448 857.448 533 858 533H894C894.552 533 895 533.448 895 534C895 534.552 894.552 535 894 535H858ZM345 560V541H347V560H401V562H294V560H345Z" fill="#353535"/>
                    </g>
                </svg>
            </div>
            <Footer/>
        </div>
    );
}
 
export default _404;
